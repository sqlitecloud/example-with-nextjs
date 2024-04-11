//
// page.tsx - minimal example of displaying data from SQLite Cloud with Next.js
//

import Image from 'next/image'
import styles from './page.module.css'
import React from 'react'

const SQLITECLOUD_URL = process.env.SQLITECLOUD_URL
const SQLITECLOUD_TOKEN = process.env.SQLITECLOUD_TOKEN

// Customers table in chinook.sqlite demo database
interface Customers {
  FirstName: string
  LastName: string
  Company: string
  // ...more columns
}

async function getCustomers(): Promise<{ customers: Customers[]; elapsedMs: number; receivedOn: string }> {
  const startedOn = new Date()

  // read "customers" from "chinook.sqlite"
  const response = await fetch(`${SQLITECLOUD_URL}/v2/weblite/chinook.sqlite/tables/customers/rows`, {
    cache: 'no-store', // This disables caching
    headers: {
      Authorization: `Bearer ${SQLITECLOUD_TOKEN}`
    }
  })

  const json = await response.json()
  return { customers: json.data, elapsedMs: new Date().getTime() - startedOn.getTime(), receivedOn: new Date().toISOString() }
}

export default async function Home() {
  const { customers, elapsedMs, receivedOn } = await getCustomers()

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          Get started by editing&nbsp;<code className={styles.code}>src/app/page.tsx</code> v1.0.2
        </p>
        <div>
          <a href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app" target="_blank" rel="noopener noreferrer">
            By <Image src="/vercel.svg" alt="Vercel Logo" className={styles.vercelLogo} width={100} height={24} priority />
          </a>
        </div>
      </div>

      <div style={{ margin: '24px' }}>
        <table>
          <thead>
            <tr>
              <th>First Name</th> <th>Last Name</th> <th>Company</th>
              {/* Add more columns as needed */}
            </tr>
          </thead>
          <tbody>
            {customers &&
              customers.map((item, index) => (
                <tr key={index}>
                  <td>{item.FirstName}</td> <td>{item.LastName}</td> <td>{item.Company}</td>
                  {/* Add more cells as needed */}
                </tr>
              ))}
          </tbody>
        </table>
        <p style={{ marginTop: '24px' }}>
          {receivedOn} in {elapsedMs}ms
        </p>
      </div>

      <div className={styles.grid}>
        <a href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app" className={styles.card} target="_blank" rel="noopener noreferrer">
          <h2>
            Docs <span>-&gt;</span>
          </h2>
          <p>Find in-depth information about Next.js features and API.</p>
        </a>

        <a href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app" className={styles.card} target="_blank" rel="noopener noreferrer">
          <h2>
            Learn <span>-&gt;</span>
          </h2>
          <p>Learn about Next.js in an interactive course with&nbsp;quizzes!</p>
        </a>

        <a href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app" className={styles.card} target="_blank" rel="noopener noreferrer">
          <h2>
            Templates <span>-&gt;</span>
          </h2>
          <p>Explore starter templates for Next.js.</p>
        </a>

        <a href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app" className={styles.card} target="_blank" rel="noopener noreferrer">
          <h2>
            Deploy <span>-&gt;</span>
          </h2>
          <p>Instantly deploy your Next.js site to a shareable URL with Vercel.</p>
        </a>
      </div>
    </main>
  )
}
