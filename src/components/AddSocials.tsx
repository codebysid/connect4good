import React from 'react'
import SocialCustomForm from './SocialCustomForm'

const socialLinkField = [
  {
    id: 1,
    name: "linkedin",
    placeholder: "https://linkedin.com/in/*username*"
  },
  {
    id: 2,
    name: "twitter",
    placeholder: "https://twitter.com/*username*"
  },
  {
    id: 3,
    name: "github",
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
