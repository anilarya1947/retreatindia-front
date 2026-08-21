import { NextResponse } from 'next/server'

export async function GET() {
  const mockPosts = [
    {
      id: '1',
      title: 'How to Choose the Right Rehab Centre in India',
      excerpt: 'Tell us about treatment needs, preferred location, budget, lifestyle expectations, accommodation preferences.',
      coverImage: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: '2',
      title: 'Signs It May Be Time to Seek Professional Rehabilitation Support',
      excerpt: 'Tell us about treatment needs, preferred location, budget, lifestyle expectations, accommodation preferences, and recovery goals for personalized rehabilitation guidance.',
      coverImage: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: '3',
      title: 'How to Choose the Right Rehab Centre in India',
      excerpt: 'Tell us about treatment needs, preferred location, budget, lifestyle expectations, accommodation preferences, and recovery goals for personalized rehabilitation guidance.',
      coverImage: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: '4',
      title: 'How to Choose the Right Rehab Centre in India',
      excerpt: 'Tell us about treatment needs, preferred location, budget, lifestyle expectations, accommodation preferences.',
      coverImage: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: '5',
      title: 'How to Choose the Right Rehab Centre in India',
      excerpt: 'Tell us about treatment needs, preferred location, budget, lifestyle expectations, accommodation preferences, and recovery goals for personalized rehabilitation guidance.',
      coverImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: '6',
      title: 'How to Choose the Right Rehab Centre in India',
      excerpt: 'Tell us about treatment needs, preferred location, budget, lifestyle expectations, accommodation preferences.',
      coverImage: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: '7',
      title: 'How to Choose the Right Rehab Centre in India',
      excerpt: 'Tell us about treatment needs, preferred location, budget, lifestyle expectations, accommodation preferences, and recovery goals for personalized rehabilitation guidance.',
      coverImage: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: '8',
      title: 'How to Choose the Right Rehab Centre in India',
      excerpt: 'Tell us about treatment needs, preferred location, budget, lifestyle expectations, accommodation preferences, and recovery goals for personalized rehabilitation guidance.',
      coverImage: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: '9',
      title: 'How to Choose the Right Rehab Centre in India',
      excerpt: 'Tell us about treatment needs, preferred location, budget, lifestyle expectations, accommodation preferences.',
      coverImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: '10',
      title: 'How to Choose the Right Rehab Centre in India',
      excerpt: 'Tell us about treatment needs, preferred location, budget, lifestyle expectations, accommodation preferences.',
      coverImage: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: '11',
      title: 'How to Choose the Right Rehab Centre in India',
      excerpt: 'Tell us about treatment needs, preferred location, budget, lifestyle expectations, accommodation preferences, and recovery goals for personalized rehabilitation guidance.',
      coverImage: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: '12',
      title: 'How to Choose the Right Rehab Centre in India',
      excerpt: 'Tell us about treatment needs, preferred location, budget, lifestyle expectations, accommodation preferences.',
      coverImage: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: '13',
      title: 'How to Choose the Right Rehab Centre in India',
      excerpt: 'Tell us about treatment needs, preferred location, budget, lifestyle expectations, accommodation preferences.',
      coverImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: '14',
      title: 'How to Choose the Right Rehab Centre in India',
      excerpt: 'Tell us about treatment needs, preferred location, budget, lifestyle expectations, accommodation preferences.',
      coverImage: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: '15',
      title: 'How to Choose the Right Rehab Centre in India',
      excerpt: 'Tell us about treatment needs, preferred location, budget, lifestyle expectations, accommodation preferences, and recovery goals for personalized rehabilitation guidance.',
      coverImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80',
    },
  ]

  return NextResponse.json({
    docs: mockPosts,
  })
}
