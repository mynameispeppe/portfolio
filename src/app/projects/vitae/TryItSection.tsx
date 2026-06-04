'use client'

import { useState } from 'react'
import { Mail, Lock, Check } from 'lucide-react'

type Field = 'email' | 'password' | null

export default function TryItSection() {
  const [copied, setCopied] = useState<Field>(null)

  const copy = (text: string, field: Field) => {
    navigator.clipboard.writeText(text)
    setCopied(field)
    setTimeout(() => setCopied(null), 1500)
  }

  return (
    <section className="mt-20 py-16 border-t border-b border-gray-200 text-center">
      <h2 className="text-3xl lg:text-4xl font-bold font-title text-text-primary">
        Try it yourself
      </h2>
      <p className="mt-3 text-text-secondary font-body text-lg max-w-xl mx-auto leading-relaxed">
        Use the test account to explore the full app — no sign-up needed.
      </p>

      <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
        <button
          onClick={() => copy('test@vitae.app', 'email')}
          className="inline-flex items-center gap-2.5 px-5 py-3 rounded-xl bg-card border border-gray-200 text-text-primary font-body text-sm hover:border-accent transition cursor-pointer"
        >
          {copied === 'email' ? (
            <Check className="w-4 h-4 text-green-500" />
          ) : (
            <Mail className="w-4 h-4 text-accent" />
          )}
          test@vitae.app
        </button>

        <button
          onClick={() => copy('vitae1234', 'password')}
          className="inline-flex items-center gap-2.5 px-5 py-3 rounded-xl bg-card border border-gray-200 text-text-primary font-body text-sm hover:border-accent transition cursor-pointer"
        >
          {copied === 'password' ? (
            <Check className="w-4 h-4 text-green-500" />
          ) : (
            <Lock className="w-4 h-4 text-accent" />
          )}
          vitae1234
        </button>
      </div>
    </section>
  )
}
