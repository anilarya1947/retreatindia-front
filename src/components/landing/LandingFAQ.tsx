'use client'

import { useState } from 'react'
import { Plus, Minus } from 'lucide-react'

interface FAQItem {
    id: number
    question: string
    answer: string
}

export default function LandingFAQ({ faqs }: { faqs: FAQItem[] }) {
    const [active, setActive] = useState<number | null>(0)

    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="text-2xl sm:text-3xl font-serif text-[#318bb0] mb-8">
                Frequently Asked Questions
            </h2>
            <div className="space-y-4 max-w-3xl">
                {faqs.map((faq, idx) => {
                    const isOpen = active === idx
                    return (
                        <div
                            key={faq.id}
                            className="bg-[#faf8f5] border border-slate-200/50 rounded-2xl overflow-hidden"
                        >
                            <button
                                onClick={() => setActive(isOpen ? null : idx)}
                                className="w-full flex items-center justify-between gap-4 p-5 text-left text-slate-700 hover:text-slate-900 transition focus:outline-none"
                            >
                                <span className="font-bold text-sm">{faq.question}</span>
                                <span className="w-6 h-6 rounded-full bg-white border border-slate-200 flex items-center justify-center shrink-0">
                                    {isOpen
                                        ? <Minus className="w-3.5 h-3.5 text-[#3bb89b]" />
                                        : <Plus className="w-3.5 h-3.5 text-[#3bb89b]" />
                                    }
                                </span>
                            </button>
                            {isOpen && (
                                <div
                                    className="px-5 pb-5 text-slate-500 text-sm leading-relaxed border-t border-slate-200/20"
                                    dangerouslySetInnerHTML={{ __html: faq.answer }}
                                />
                            )}
                        </div>
                    )
                })}
            </div>
        </section>
    )
}