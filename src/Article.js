import Section from "./Section";

function Article(props){
    return <article>
        <h1>{props.articleTitle}</h1>
        <Section sectionTitle="Section 1 Title" sectionText="Section 1 Text"/>
        <Section sectionTitle="Section 2 Title" sectionText="Section 2 Text"/>
        </article>;
}

export default Article;