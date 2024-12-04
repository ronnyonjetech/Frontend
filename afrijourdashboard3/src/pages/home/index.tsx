import { Layout } from '@/components/custom/layout';
import { UserNav } from '@/components/user-nav';
import { TopNav } from '@/components/top-nav';
import { useState, useEffect } from 'react';
import { Hero } from '@/components/home/Hero';
import { SearchSection } from '@/components/home/SearchSection';
import { JournalResults } from '@/components/home/JournalResults';
import { WelcomePopup } from '@/components/home/WelcomePopup';
// import { useLocation } from 'react-router-dom';

export default function Home() {
  const [showPopup, setShowPopup] = useState(true);
  const [journals, setJournals] = useState([]);
  const [searchType, setSearchType] = useState<string>('abstract');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [results, setResults] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const pageSize = 10;

  // Define filter types explicitly
  type Filters = {
    Present_on_ISSN: boolean | null;
    african_index_medicus: boolean | null;
    directory_of_african_journals: boolean | null;
    hosted_on_INASPS: boolean | null;
    indexed_on_google_scholar: boolean | null;
    member_of_Committee_on_publication_Ethics: boolean | null;
    online_publisher_in_africa: boolean | null;
    open_access_journal: boolean | null;
  };

  const [filters] = useState<Filters>({
    Present_on_ISSN: null,
    african_index_medicus: null,
    directory_of_african_journals: null,
    hosted_on_INASPS: null,
    indexed_on_google_scholar: null,
    member_of_Committee_on_publication_Ethics: null,
    online_publisher_in_africa: null,
    open_access_journal: null,
  });

  const generateUrl = () => {
    const baseUrl = 'https://aphrc.site/journal_api/journals/search/';
    const params = new URLSearchParams(location.search);
    
    Object.entries(filters)
      .filter(([_, value]) => value !== null)
      .forEach(([key, value]) => {
        if (value !== null) {
          params.append(key, value.toString());
        }
      });

    if (searchQuery) params.append('query', searchQuery);
    params.append('page', currentPage.toString());
    params.append('page_size', pageSize.toString());

    return `${baseUrl}?${params.toString()}`;
  };

  const fetchJournals = async () => {
    setLoading(true);
    try {
      const url = generateUrl();
      console.log("url",url)
      const response = await fetch(url);
      const data = await response.json();
      setJournals(data.results);
      setTotalPages(Math.ceil(data.count / pageSize));
      setResults(data.count);
    } catch (error) {
      console.error('Error fetching journals:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJournals();
  }, [currentPage, searchQuery, filters,location.search]);

  return (
    <Layout>
      <WelcomePopup show={showPopup} onClose={() => setShowPopup(false)} />

      <Layout.Header>
        <TopNav links={topNav} />
        <div className="ml-auto flex items-center space-x-4">
          <UserNav />
        </div>
      </Layout.Header>

      <Layout.Body>
        <div className="flex min-h-screen flex-col">
          <Hero totalJournals={results} />

          <SearchSection
            searchType={searchType}
            searchQuery={searchQuery}
            onSearchTypeChange={setSearchType}
            onSearchQueryChange={setSearchQuery}
            onSearch={() => {
              setCurrentPage(1);
              fetchJournals();
            }}
          />

          <JournalResults
            journals={journals}
            loading={loading}
            currentPage={currentPage}
            totalPages={totalPages}
            totalResults={results}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </Layout.Body>
    </Layout>
  );
}

const topNav = [
  {
    title: 'Home',
    href: '/',
    isActive: true,
  },
];
