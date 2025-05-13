import { useLoaderData } from "react-router-dom"

const UserDetailsPage = () => {

    const user = useLoaderData()
    console.log(user)

  return (
    <section>
        <h1>User Details</h1>
    </section>
  )
}

export default UserDetailsPage
