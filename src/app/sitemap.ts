import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const currentDate = new Date()

  return [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 1.0,
      alternates: {
        languages: {
          ko: baseUrl,
        },
      },
    },
    {
      url: `${baseUrl}/game/star`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 0.9,
      alternates: {
        languages: {
          ko: `${baseUrl}/game/star`,
        },
      },
    },
    {
      url: `${baseUrl}/game/star/alone`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 0.8,
      alternates: {
        languages: {
          ko: `${baseUrl}/game/star/alone`,
        },
      },
    },
    {
      url: `${baseUrl}/game/star/others`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 0.8,
      alternates: {
        languages: {
          ko: `${baseUrl}/game/star/others`,
        },
      },
    },
    {
      url: `${baseUrl}/results`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
      alternates: {
        languages: {
          ko: `${baseUrl}/results`,
        },
      },
    },
  ]
}
