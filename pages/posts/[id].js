import Layout from '../../components/layout';
import Head from 'next/head';
import Date from '../../components/date';
import utilStyles from '../../styles/utils.module.css';

export async function getStaticPaths() {
  const api = process.env.API_URL;
  const response = await fetch(api);
  const data =  await response.json();

  const paths = data.map(post => {
    return {
      params: { id: post.id.toString() }
    }
  })

  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps(context) {
  const id = context.params.id;
  const api = process.env.API_URL;
  const response = await fetch(`${api}/${id}`);
  const data = await response.json();

  return {
    props: {post: data}
  }
}

export default function Post({ post }) {
  return (
    <Layout home>
      <Head>
        <title>{ post.title }</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{ post.title }</h1>
        <p> { post.description } </p>
        <div className={utilStyles.lightText}>
          <Date dateString={ post.published_at } />
        </div>
      </article>
    </Layout>
  );
}
