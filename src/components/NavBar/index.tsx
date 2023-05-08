import Link from 'next/link'
import React from 'react'
import { useTranslation } from 'next-i18next'
import styles from './NavBar.module.scss'
import LocaleSelect from '../LocaleSelect'
import capitalizeWord from '@/helpers/capitalizeWord'
import { selectUser, setUser } from '@/redux/features/AuthSlice/AuthSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'

import { signOut } from 'firebase/auth'
import { auth } from '@/firebase/clientApp'

const NavBar = () => {
  const dispatch = useAppDispatch()
  const user = useAppSelector(selectUser)
  const { t } = useTranslation('common')

  return (
    <nav className={styles.navBar}>
      <Link href="/">
        <div className={styles.logo}></div>
      </Link>
      <div className={styles.languageContainer}>
        <LocaleSelect />
      </div>
      {user && (
        <div className={styles.welcomeContainer}>
          <h2>
            {t('welcome')} {user?.displayName}!
          </h2>
        </div>
      )}
      <ul className={styles.navList}>
        {user && (
          <li>
            <Link href="/" className={styles.navLink}>
              {capitalizeWord(t('gotomain'))}
            </Link>
          </li>
        )}
        {user && (
          <li>
            <Link href="/editor" className={styles.navLink}>
              {capitalizeWord(t('editor'))}
            </Link>
          </li>
        )}

        {!user ? (
          <li>
            <Link href="/auth" className={styles.navLink}>
              {t('in')}
            </Link>
          </li>
        ) : (
          <li>
            <Link
              href="/auth"
              className={styles.navLink}
              onClick={() => {
                signOut(auth)
                dispatch(setUser(null))
              }}
            >
              {capitalizeWord(t('out'))}
            </Link>
          </li>
        )}
      </ul>
    </nav>
  )
}

export default NavBar
