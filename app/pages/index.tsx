import { Suspense } from "react"
import { Link, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import logout from "app/auth/mutations/logout"
import logo from "public/logo.png"
import { Button, Container, Row, Col } from "@nextui-org/react"

/*
 * This file is just for a pleasant getting started page for your new app.
 * You can delete everything in here and start from scratch if you like.
 */

const UserInfo = () => {
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)

  if (currentUser) {
    return (
      <>
        <Button
          className="button small"
          onClick={async () => {
            await logoutMutation()
          }}
        >
          Logout
        </Button>
        <div>
          User: <code>{currentUser.id}</code>
          <br />
          User role: <code>{currentUser.role}</code>
        </div>
      </>
    )
  } else {
    return (
      <Row gap={1} css={{ width: 200 }}>
        <Col>
          <Link href={Routes.SignupPage()}>
            <Button>
              <strong>Sign Up</strong>
            </Button>
          </Link>
        </Col>
        <Col>
          <Link href={Routes.LoginPage()}>
            <Button>
              <strong>Login</strong>
            </Button>
          </Link>
        </Col>
      </Row>
    )
  }
}

const Home: BlitzPage = () => {
  return (
    <Container gap={0}>
      <Row gap={1}>
        <Col>
          <strong>Congrats!</strong> Your app is ready, including user sign-up and log-in.
          <Suspense fallback="Loading...">
            <UserInfo />
          </Suspense>
          <p>
            <strong>
              To add a new model to your app, <br />
              run the following in your terminal:
            </strong>
          </p>
          <pre>
            <code>blitz generate all project name:string</code>
          </pre>
          <div style={{ marginBottom: "1rem" }}>(And select Yes to run prisma migrate)</div>
          <div>
            <p>
              Then <strong>restart the server</strong>
            </p>
            <pre>
              <code>Ctrl + c</code>
            </pre>
            <pre>
              <code>blitz dev</code>
            </pre>
            <p>
              and go to{" "}
              <Link href="/projects">
                <a>/projects</a>
              </Link>
            </p>
          </div>
          <a
            className="button"
            href="https://blitzjs.com/docs/getting-started?utm_source=blitz-new&utm_medium=app-template&utm_campaign=blitz-new"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation
          </a>
          <a
            className="button-outline"
            href="https://github.com/blitz-js/blitz"
            target="_blank"
            rel="noopener noreferrer"
          >
            Github Repo
          </a>
          <a
            className="button-outline"
            href="https://discord.blitzjs.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Discord Community
          </a>
          <footer>
            <a
              href="https://blitzjs.com?utm_source=blitz-new&utm_medium=app-template&utm_campaign=blitz-new"
              target="_blank"
              rel="noopener noreferrer"
            >
              Powered by Blitz.js
            </a>
          </footer>
        </Col>
      </Row>
    </Container>
  )
}

Home.suppressFirstRenderFlicker = true
Home.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default Home
