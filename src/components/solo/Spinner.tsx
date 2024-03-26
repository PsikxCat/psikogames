'use client'

import { ProgressBar } from 'react-loader-spinner'

interface SpinnerProps {
  visible: boolean
}

export default function Spinner({ visible }: SpinnerProps) {
  return (
    <div>
      <ProgressBar
        visible={visible}
        height="60"
        width="60"
        barColor="#FFBB5C"
        borderColor='#78716E'
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  )
}
