import React from 'react'
import SocialCustomForm from './SocialCustomForm'


type SocialLinkFieldName = "linkedin" | "twitter" | "github";

const socialLinkField = [
  {
    id: 1,
    name: "linkedin" as SocialLinkFieldName,
    placeholder: "https://linkedin.com/in/*username*"
  },
  {
    id: 2,
    name: "twitter" as SocialLinkFieldName,
    placeholder: "https://twitter.com/*username*"
  },
  {
    id: 3,
    name: "github" as SocialLinkFieldName,
    placeholder: "https://github.com/*username*"
  }
]

const AddSocials = () => {

  return (
    <div>
      {
        socialLinkField.map((social) => {
          return <SocialCustomForm key={social.id} name={social.name} placeholder={social.placeholder} />
        })
      }
    </div>
  )
}

export default AddSocials
