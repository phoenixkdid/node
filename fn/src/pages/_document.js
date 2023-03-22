import Document, { Html, Head, Main, NextScript } from 'next/document'
function Documents() {
    return (
        <Html lang="en">
            <Head>
                <title>Kapten Wa</title>
                <meta name="description" content="some description here" />
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
                />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}

export default Documents
