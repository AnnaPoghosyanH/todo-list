import { useState, memo } from "react";
import PropTypes from "prop-types";
import { Accordion, Form, Container, Row, Col } from "react-bootstrap";
import { ArrowClockwise, Search } from "react-bootstrap-icons";
import DatePicker from "react-datepicker";
import { formatDate } from "../../utils/helpers";
import styles from "./filters.module.css";

const dateOptions = [
  { label: "Created after", value: "create_gte" },
  { label: "Created before", value: "create_lte" },
  { label: "Deadline after", value: "complete_gte" },
  { label: "Deadline before", value: "complete_lte" },
];

const statusOptions = [
  { label: "Status (None)", value: "" },
  { label: "Active", value: "active" },
  { label: "Done", value: "done" },
];

const sortOptions = [
  { label: "Sort (None)", value: "" },
  { label: "A-Z", value: "a-z" },
  { label: "Z-A", value: "z-a" },
  { label: "Creation date oldest", value: "creation_date_oldest" },
  { label: "Creation date newest", value: "creation_date_newest" },
  { label: "Completion date oldest", value: "completion_date_oldest" },
  { label: "Completion date newest", value: "completion_date_newest" },
];

const initialDateFilters = {
  create_lte: "",
  create_gte: "",
  complete_lte: "",
  complete_gte: "",
};

const initialOptionFilters = {
  status: "",
  sort: "",
};

function Filters(props) {
  const [search, setSearch] = useState("");
  const [dateFilters, setDateFilters] = useState(initialDateFilters);
  const [optionFilters, setOptionFilters] = useState(initialOptionFilters);

  const resetFilters = () => {
    setSearch("");
    setDateFilters(initialDateFilters);
    setOptionFilters(initialOptionFilters);
    props.onFilter({
      search: "",
      ...initialDateFilters,
      ...initialOptionFilters,
    });
  };

  const onSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const onApplyFilters = () => {
    const filters = {
      search: search,
      ...dateFilters,
      ...optionFilters,
    };
    props.onFilter(filters);
  };

  const onDateChange = (name, date) => {
    setDateFilters({
      ...dateFilters,
      [name]: formatDate(date),
    });
  };

  const onFilterOptionChange = (name, value) => {
    setOptionFilters({
      ...optionFilters,
      [name]: value,
    });
  };

  return (
    <Accordion className="mb-4">
      <Accordion.Item eventKey="0">
        <Accordion.Header>
          <Form
            className={`${styles.form} d-flex`}
            onClick={(event) => event.stopPropagation()}
          >
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2 rounded-pill"
              aria-label="Search"
              value={search}
              onChange={onSearchChange}
            />
            <span
              className="btn btn-outline-primary me-2"
              title="Apply filters"
              onClick={onApplyFilters}
            >
              <Search />
            </span>
            <span
              className="btn btn-outline-info"
              title="Reset filters"
              onClick={resetFilters}
            >
              <ArrowClockwise />
            </span>
          </Form>
        </Accordion.Header>
        <Accordion.Body>
          <Container fluid={true}>
            <Row>
              {dateOptions.map((dateOption) => {
                const dateValue = dateFilters[dateOption.value];
                return (
                  <Col
                    sm={12}
                    md={6}
                    lg={6}
                    xl={3}
                    className="text-center"
                    key={dateOption.label}
                  >
                    <fieldset className={styles.filterItem}>
                      <legend>{dateOption.label}</legend>
                      <DatePicker
                        showIcon
                        selected={dateValue ? new Date(dateValue) : ""}
                        onChange={(date) =>
                          onDateChange(dateOption.value, date)
                        }
                      />
                    </fieldset>
                  </Col>
                );
              })}
            </Row>
            <Row>
              <Col sm={6} className="text-center">
                <fieldset className="mt-4">
                  <Form.Select
                    onChange={(event) =>
                      onFilterOptionChange("status", event.target.value)
                    }
                    value={optionFilters.status}
                  >
                    {statusOptions.map((statusOption) => (
                      <option
                        key={statusOption.label}
                        value={statusOption.value}
                      >
                        {statusOption.label}
                      </option>
                    ))}
                  </Form.Select>
                </fieldset>
              </Col>
              <Col sm={6} className="text-center">
                <fieldset className="mt-4">
                  <Form.Select
                    onChange={(event) =>
                      onFilterOptionChange("sort", event.target.value)
                    }
                    value={optionFilters.sort}
                  >
                    {sortOptions.map((sortOption) => (
                      <option key={sortOption.label} value={sortOption.value}>
                        {sortOption.label}
                      </option>
                    ))}
                  </Form.Select>
                </fieldset>
              </Col>
            </Row>
          </Container>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

Filters.propTypes = {
  onFilter: PropTypes.func.isRequired,
};

export default memo(Filters);
