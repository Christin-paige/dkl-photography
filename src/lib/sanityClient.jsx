import {createClient}  from "@sanity/client";

const sanityClient = createClient({
  projectId: 'kuq8fhtf',
  dataset: 'production',
  useCdn: true,
  apiVerson: '2024-11-18',
})

export default sanityClient