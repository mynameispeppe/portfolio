import { redirect } from 'next/navigation'

export default function VitaePage({ params }: { params: { lang: string } }) {
  redirect(`/${params.lang}`)
}

/*
  Full Vitae project page — disabled, to be redesigned.
  Original source preserved in git history.
*/
