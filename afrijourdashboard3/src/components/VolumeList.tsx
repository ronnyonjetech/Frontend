import { useState } from 'react'
import { ChevronRight, ChevronDown } from 'lucide-react'
import { ExternalLink } from 'lucide-react'

interface Article {
  id: number
  title: string
  authors: string
  pdf: string
  url: string
  doi: string
  electronic_issn: string
}

interface Volume {
  id: number
  volume_number: number
  issue_number: number
  year: number
  articles: Article[]
}

interface VolumeListProps {
  volumes: Volume[]
}

export function VolumeList({ volumes }: VolumeListProps) {
  const [expandedVolume, setExpandedVolume] = useState<number | null>(null)

  // const handleDownload = async (pdf: string, title: string) => {
  //   try {
  //     const response = await fetch(`https://aphrc.site${pdf}`)
  //     if (!response.ok) throw new Error('Download failed')
  //     const blob = await response.blob()
  //     const url = window.URL.createObjectURL(blob)
  //     const link = document.createElement('a')
  //     link.href = url
  //     link.download = `${title}.pdf`
  //     document.body.appendChild(link)
  //     link.click()
  //     document.body.removeChild(link)
  //     window.URL.revokeObjectURL(url)
  //   } catch (error) {
  //     console.error('Download error:', error)
  //   }
  // }

  return (
    <div className='space-y-4'>
      {volumes.map((volume) => (
        <div key={volume.id} className='overflow-hidden rounded-lg border'>
          <button
            onClick={() =>
              setExpandedVolume(expandedVolume === volume.id ? null : volume.id)
            }
            className='flex w-full items-center justify-between bg-gray-50 p-4 hover:bg-gray-100'
          >
            <div className='flex items-center gap-2'>
              {expandedVolume === volume.id ? (
                <ChevronDown className='h-4 w-4' />
              ) : (
                <ChevronRight className='h-4 w-4' />
              )}
              <span className='font-medium'>
                Volume {volume.volume_number} (Issue {volume.issue_number},{' '}
                {volume.year})
              </span>
            </div>
            <span className='text-sm text-gray-500'>
              {volume.articles.length} articles
            </span>
          </button>

          {expandedVolume === volume.id && (
            <div className='divide-y'>
              {volume.articles.map((article) => (
                <div key={article.id} className='p-4 hover:bg-gray-50'>
                  <div className='flex items-start justify-between gap-4'>
                    <div className='flex-1'>
                      <h3 className='font-medium text-gray-900'>
                        {article.title}
                      </h3>
                      <p className='mt-1 text-sm text-gray-500'>
                        {article.authors}
                      </p>

                      <p className='mt-1 text-sm'>
                        <span className='text-gray-600'>Electronic ISSN: </span>
                        <span className='text-green-600'>
                          {article.electronic_issn}
                        </span>
                      </p>
                    </div>

                    <a
                      href={article.url}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-blue-600 hover:text-blue-800'
                      aria-label={`Open ${article.title}`}
                    >
                      <ExternalLink className='h-5 w-5' />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}