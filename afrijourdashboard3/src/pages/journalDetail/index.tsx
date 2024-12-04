import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Layout } from '@/components/custom/layout';
import { TopNav } from '@/components/top-nav';
import { UserNav } from '@/components/user-nav';
import { ExternalLink } from 'lucide-react';
import { JournalMetrics } from '@/components/JournalMetrics';
import { JournalMetadata } from '@/components/JournalMetadata';
import { VolumeList } from '@/components/VolumeList';


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
  title: string;
  id: number;
  volume_number: number;
  issue_number: number;
  year: number;
  articles: Article[];
}

interface Image {
  id: number;
  image: string;
  description: string;
}

interface Journal {
  journal_title?: string;
  summary?: string;
  image?: Image;
  link?: string;
  volumes?: Volume[];
  open_access_journal?: boolean;
  listed_in_doaj?: boolean;
  publisher_in_cope?: boolean;
  present_issn?: boolean;
  online_publisher_africa?: boolean;
  google_scholar_index?: boolean;
  sjr?: boolean;
  eigen_factor?: boolean;
  snip?: boolean;
  hosted_on_inasps?: boolean;
  aim_identifier?: boolean;
  medline?: boolean;
  snip_metrix: number | null;
  impact_factor: number | null;
  h_index: number | null;
  eigen_metrix: string | null;
}

export default function JournalDetail() {
  const { journalId } = useParams();
  const [journal, setJournal] = useState<Journal | null>(null);
  const [imageStatus, setImageStatus] = useState<'loading' | 'error' | 'loaded'>('loading');

  useEffect(() => {
    const fetchJournal = async () => {
      try {
        const response = await fetch(`https://aphrc.site/journal_api/api/journals/${journalId}/`);
        if (!response.ok) throw new Error('Failed to fetch journal data');
        const data: Journal = await response.json();

        if (data.volumes) {
          data.volumes.sort((a, b) => {
            const parseVolumeInfo = (title: string) => {
              const match = title.match(/Volume\s(\d+)\s\(Issue\s(\d+),\s(\d{4})\)/);
              if (!match) return { volumeNo: 0, issueNo: 0, year: 0 };
              const [, volumeNo, issueNo, year] = match.map(Number);
              return { volumeNo, issueNo, year };
            };

            const volA = parseVolumeInfo(a.title || '');
            const volB = parseVolumeInfo(b.title || '');

            if (volA.year !== volB.year) return volB.year - volA.year;
            if (volA.volumeNo !== volB.volumeNo) return volB.volumeNo - volA.volumeNo;
            return volB.issueNo - volA.issueNo;
          });
        }

        setJournal(data);
      } catch (error) {
        console.error('Error fetching journal:', error);
      }
    };

    fetchJournal();
  }, [journalId]);

  const getImageUrl = (imagePath: string) =>
    imagePath.startsWith('/') ? `https://aphrc.site${imagePath}` : `https://aphrc.site/${imagePath}`;

  if (!journal) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-20 w-20 animate-ping rounded-full bg-blue-600"></div>
      </div>
    );
  }

  const links = journal.link ? journal.link.split(', ') : [];

  return (
    <Layout>
      <Layout.Header>
        <TopNav links={[{ title: 'Back', href: '/', isActive: false }]} />
        <div className="ml-auto flex items-center space-x-4">
          <UserNav />
        </div>
      </Layout.Header>

      <Layout.Body>
        <div className="mx-auto max-w-7xl px-4 py-8">
          <div className="grid gap-8">
            {/* Journal Header */}
            <div className="rounded-xl bg-[#BFEFFF] p-6 shadow-lg">
              <div className="flex flex-col lg:flex-row gap-8">
                <div className="lg:w-1/3">
                  <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg bg-white shadow-md">
                    {journal.image ? (
                      <>
                        <img
                          src={getImageUrl(journal.image.image)}
                          alt={journal.image.description || 'Journal cover'}
                          className={`h-full w-full object-contain transition-opacity duration-300 ${
                            imageStatus === 'loaded' ? 'opacity-100' : 'opacity-0'
                          }`}
                          onLoad={() => setImageStatus('loaded')}
                          onError={() => setImageStatus('error')}
                        />
                        {imageStatus === 'loading' && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
                          </div>
                        )}
                        {imageStatus === 'error' && (
                          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                            <span className="text-gray-400">Image not available</span>
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="aspect-[3/4] w-full rounded-lg bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-500">No image available</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex-1 space-y-6">
                  <div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                      {journal.journal_title || 'Untitled Journal'}
                    </h1>
                    {journal.summary && (
                      <p className="text-lg text-gray-700 leading-relaxed">{journal.summary}</p>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {links.map((link, index) => {
                      const domain = new URL(link).hostname.replace('www.', '');
                      return (
                        <a
                          key={index}
                          href={link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-blue-700 shadow-sm transition-all hover:bg-blue-50 hover:shadow-md"
                        >
                          {domain}
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Metrics Section */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900">Journal Metrics</h2>
              <JournalMetrics metrics={journal} />
            </section>

            {/* Metadata Section */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900">Journal Information</h2>
              <JournalMetadata metadata={journal} />
            </section>

            {/* Volumes Section */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900">Volumes and Articles</h2>
              {journal.volumes && journal.volumes.length > 0 ? (
                <VolumeList volumes={journal.volumes} />
              ) : (
                <p className="text-gray-500">No volumes available</p>
              )}
            </section>
          </div>
        </div>
      </Layout.Body>
    </Layout>
  );
}
