export default {
    title:'Web 3D Viewer',
    description:'Web 3D Viewer is a free web solution for reading 3D file formats online.',
    canonical: process.env.SITE_URL||'https://www.web3dviewer.net',
    openGraph:{
      type:'website',
      url:process.env.SITE_URL||'https://www.web3dviewer.net',
      title:'Web 3D Viewer',
      description:'Web 3D Viewer is a free web solution for reading 3D file formats online.',
      site_name:'Web 3D Viewer',
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