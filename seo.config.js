export default {
    title:process.env.SEO_TITLE,
    description:process.env.SEO_DESCRIPTION,
    canonical: process.env.SITE_URL,
    openGraph:{
      type:'website',
      url:process.env.SITE_URL,
      title:process.env.SEO_TITLE,
      description:process.env.SEO_DESCRIPTION,
      site_name:process.env.SEO_TITLE,
      images:[
        {
          url: "/preview.png",
          width: 800,
          height: 420,
          alt: "Web 3D Viewer",
        }
      ]
    },
    twitter:{
      handle: '@handle',
      site: '@site',
      cardType: 'summary_large_image',
    }
  }