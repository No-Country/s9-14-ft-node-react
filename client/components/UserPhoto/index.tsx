import Image from "next/image"

export function UserPhoto ({src, alt = 'user photo'}: {src: string, alt?: string}) {
  return (
    <span>
      <Image src={src} alt={alt} width={40} height={40} />
    </span>
  )
}