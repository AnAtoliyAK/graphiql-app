import React from 'react'
import styles from './SignInForm.module.scss'
import Button from '@/UI/Button'
import { useForm } from 'react-hook-form'
import AuthInput from '../AuthInput'
import AuthErrorMessage from '../AuthErrorMessage'
import { useTranslation } from 'next-i18next'

const SignInForm = () => {
  const onSubmit = (data: object) => {
    console.log(JSON.stringify(data))
    reset()
  }

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
  })

  const { t } = useTranslation('auth')

  return (
    <form action="#" className={styles.container} onSubmit={handleSubmit(onSubmit)}>
      <AuthInput
        control={control}
        name="login"
        type="text"
        rules={{
          required: 'nologin',
          pattern: {
            value: /^(?=.*[A-Za-z0-9]$)[A-Za-z][A-Za-z\d.-]{0,19}$/,
            message: 'wrongInput',
          },
          minLength: {
            value: 5,
            message: 'min',
          },
        }}
      />
      <AuthInput
        control={control}
        name="password"
        type="password"
        rules={{
          required: 'nopass',
          minLength: {
            value: 5,
            message: 'min',
          },
        }}
      />
      <Button primaryText={t('in')} disabled={!isValid} type="submit" />
      <aside className={styles.errors}>
        <AuthErrorMessage isVisible={!!errors.login} message={`${errors.login?.message}`} />
        <AuthErrorMessage isVisible={!!errors.password} message={`${errors.password?.message}`} />
      </aside>
    </form>
  )
}

export default SignInForm
