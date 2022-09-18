import {GetServerSideProps} from 'next'
import Error from 'next/error'

import PrismaService from 'src/services/prisma'

export default function Page() {
  return <Error statusCode={404}/>
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const {slug} = context.query

  const prisma = PrismaService.prisma()
  const redirect = await prisma.redirects.findFirst({
    where: {
      slug: slug.toString(),
    }
  })

  if (!redirect) {
    return {
      props: {},
    }
  }

  return {
    redirect: {
      permanent: false,
      destination: redirect.original_url,
    },
    props: {}
  }
}
