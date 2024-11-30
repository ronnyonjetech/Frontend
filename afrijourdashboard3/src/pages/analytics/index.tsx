// import { Layout } from '@/components/custom/layout'
// import { UserNav } from '@/components/user-nav'
// import { TopNav } from '@/components/top-nav'
// import { useState, useEffect, SetStateAction } from 'react'
// import { BarChart3, BookOpen, GraduationCap, Globe2 } from 'lucide-react'
// import { AnalyticsHeader } from '@/components/analytics/AnalyticsHeader'
// import { AnalyticsFilters } from '@/components/analytics/AnalyticsFilters'
// import { JournalsTable } from '@/components/analytics/JournalsTable'
// import { StatsCards } from '@/components/analytics/StatsCards'
// import { JournalVisualizations } from '@/components/analytics/JournalVisualizations'

// export default function Analytics() {
//   const [journals, setJournals] = useState([])
//   const [loading, setLoading] = useState(false)
//   const [filters, setFilters] = useState({
//     country: '',
//     thematicArea: '',
//     language: '',
//     doaj: '',
//     oaj: '',
//     africanPublisher: '',
//     inasps: '',
//     cope: '',
//     issn: '',
//     googleScholar: false,
//     scopus: false
//   })

//   const fetchJournals = async (url = 'https://aphrc.site/journal_api/journals/search/') => {
//     const response = await fetch(url)
//     const data = await response.json()
//     setJournals(data.results)
//   }

//   useEffect(() => {
//     fetchJournals()
//   }, [])

//   const handleCriteriaChange = (newFilters: SetStateAction<{ country: string; thematicArea: string; language: string; doaj: string; oaj: string; africanPublisher: string; inasps: string; cope: string; issn: string; googleScholar: boolean; scopus: boolean }>) => {
//     setFilters(newFilters)
//   }

//   const generateSearchUrl = () => {
//     const baseUrl = 'https://aphrc.site/journal_api/journals/search/'
//     const params = new URLSearchParams()

//     Object.entries(filters).forEach(([key, value]) => {
//       if (value) {
//         if (typeof value === 'boolean') {
//           params.append(key, value.toString())
//         } else if (value === 'Yes') {
//           params.append(key, 'true')
//         } else if (value === 'No') {
//           params.append(key, 'false')
//         } else {
//           params.append('query', value)
//         }
//       }
//     })

//     return params.toString() ? `${baseUrl}?${params.toString()}` : baseUrl
//   }

//   const fetchFilteredJournals = async () => {
//     setLoading(true)
//     try {
//       const url = generateSearchUrl()
//       const response = await fetch(url)
//       const data = await response.json()
//       setJournals(data.results)
//     } catch (error) {
//       console.error('Error fetching filtered journals:', error)
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <Layout>
//       <Layout.Header>
//         <TopNav links={topNav} />
//         <div className="ml-auto flex items-center space-x-4">
//           <UserNav />
//         </div>
//       </Layout.Header>

//       <Layout.Body>
//         <div className="space-y-8">
//           <AnalyticsHeader />

//           <StatsCards
//             stats={[
//               {
//                 title: "Total Journals",
//                 value: journals.length,
//                 icon: BookOpen,
//                 trend: "+12.5%"
//               },
//               {
//                 title: "Academic Fields",
//                 value: "24",
//                 icon: GraduationCap,
//                 trend: "+4.3%"
//               },
//               {
//                 title: "Countries",
//                 value: "38",
//                 icon: Globe2,
//                 trend: "+2.1%"
//               },
//               {
//                 title: "Citations",
//                 value: "12.4K",
//                 icon: BarChart3,
//                 trend: "+23.1%"
//               }
//             ]}
//           />

//           <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
//             <div className="lg:col-span-4">
//               <AnalyticsFilters
//                 filters={filters}
//                 onCriteriaChange={handleCriteriaChange}
//                 onSearch={fetchFilteredJournals}
//                 loading={loading}
//               />
//             </div>

//             <div className="space-y-8 lg:col-span-8">
//               <JournalVisualizations journals={journals} />
//               <JournalsTable journals={journals} />
//             </div>
//           </div>
//         </div>
//       </Layout.Body>
//     </Layout>
//   )
// }
// @ts-ignore
// @ts-nocheck
import { Layout } from '@/components/custom/layout'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Search } from '@/components/search'
import './components/index.css'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import ThemeSwitch from '@/components/theme-switch'
import { TopNav } from '@/components/top-nav'
import { UserNav } from '@/components/user-nav'
import AnalyticsForm from './components/analytics-form'
import { RadialStacked } from '../dashboard/components/radial-stacked'
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  TableHeader,
} from '@/components/ui/table'
import { useState, useEffect } from 'react'
import { IconCircleCheck, IconCircleX } from '@tabler/icons-react'
import { Link } from 'react-router-dom'

export default function Analytics() {
  const [journals, setJournals] = useState([])
  const [selectedCountry, setSelectedCountry] = useState('')
  const [selectedThematicArea, setSelectedThematicArea] = useState('')
  const [selectedLanguage, setSelectedLanguage] = useState('')
  const [selectedDoaj, setSelectedDoaj] = useState('')
  const [selectedOaj, setSelectedOaj] = useState('')
  const [selectedAfricanPublisher, setSelectedAfricanPublisher] = useState('')
  const [selectedInasps, setSelectedInasps] = useState('')
  const [selectedCope, setCope] = useState('')
  const [selectedIssn, setIssn] = useState('')
  const [loading, setLoading] = useState(false)

  // const [selectedGoogleScholar, setSelectedGoogleScholar] = useState('');
  // const [selectedScopus, setSelectedScopus] = useState('');
  const [selectedGoogleScholar, setSelectedGoogleScholar] =
    useState<boolean>(false)
  const [selectedScopus, setSelectedScopus] = useState<boolean>(false)

  // Fetch journals with search URL
  const fetchJournals = async (
    url = 'https://aphrc.site/journal_api/journals/search/'
  ) => {
    const response = await fetch(url)
    const data = await response.json()
    setJournals(data.results)
  }

  useEffect(() => {
    fetchJournals()
  }, [])

  const handleCriteriaChange = (
    country: string,
    thematicArea: string,
    language: string,
    doaj: string,
    oaj: string,
    ap: string,
    inasps: string,
    cope: string,
    issn: string,
    googleScholar: boolean,
    scopus: boolean
    // googleScholar: string,
    // scopus: string
  ) => {
    setSelectedCountry(country)
    setSelectedThematicArea(thematicArea)
    setSelectedLanguage(language)
    setSelectedDoaj(doaj)
    setSelectedOaj(oaj)
    setSelectedAfricanPublisher(ap)
    setSelectedInasps(inasps)
    setCope(cope)
    setIssn(issn)
    setSelectedGoogleScholar(googleScholar)
    setSelectedScopus(scopus)
  }

  const generateSearchUrl = () => {
    const baseUrl = 'https://aphrc.site/journal_api/journals/search/'
    const params = new URLSearchParams()

    // Boolean filters - add only if selected
    if (selectedDoaj)
      params.append(
        'directory_of_african_journals',
        selectedDoaj === 'Yes' ? 'true' : 'false'
      )
    if (selectedOaj)
      params.append(
        'open_access_journal',
        selectedOaj === 'Yes' ? 'true' : 'false'
      )
    if (selectedAfricanPublisher)
      params.append(
        'online_publisher_in_africa',
        selectedAfricanPublisher === 'Yes' ? 'true' : 'false'
      )
    if (selectedInasps)
      params.append(
        'hosted_on_INASPS',
        selectedInasps === 'Yes' ? 'true' : 'false'
      )
    if (selectedCope)
      params.append(
        'member_of_Committee_on_publication_Ethics',
        selectedCope === 'Yes' ? 'true' : 'false'
      )
    if (selectedIssn)
      params.append(
        'Present_on_ISSN',
        selectedIssn === 'Yes' ? 'true' : 'false'
      )
    if (selectedGoogleScholar)
      params.append(
        'indexed_on_google_scholar',
        selectedGoogleScholar === true ? 'true' : 'false'
      )
    if (selectedScopus)
      params.append(
        'indexed_on_scopus',
        selectedScopus === true ? 'true' : 'false'
      )

    // Combine selected country, thematic area, and language into a single `query` parameter
    const queryParts = []
    if (selectedCountry) queryParts.push(selectedCountry)
    if (selectedThematicArea) queryParts.push(selectedThematicArea)
    if (selectedLanguage) queryParts.push(selectedLanguage)

    // Append `query` if there are any parts
    if (queryParts.length > 0) {
      const queryValue = queryParts.join(' ') // Join parts with spaces
      params.append('query', queryValue)
    }

    // Return the final URL
    const queryString = params.toString()
    return queryString ? `${baseUrl}?${queryString}` : baseUrl
  }

  // Fetch journals based on selected criteria
  const fetchFilteredJournals = async () => {
    setLoading(true) // Start loading
    try {
      const url = generateSearchUrl()
      const response = await fetch(url)
      const data = await response.json()
      setJournals(data.results)
      console.log('url:-', url)
      console.log('data:-', data.results)
    } catch (error) {
      console.error('Error fetching filtered journals:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Layout>
      {/* ===== Top Heading ===== */}
      <Layout.Header>
        <TopNav links={topNav} />
        <div className='ml-auto flex items-center space-x-4'>
          {/* <Search />
          <ThemeSwitch /> */}
          <UserNav />
        </div>
      </Layout.Header>

      {/* ===== Main ===== */}
      <Layout.Body>
      
        <div className='mb-2 flex items-center justify-between space-y-2'>
          <h1 className='text-2xl font-bold tracking-tight'>Analytics</h1>
        </div>
        <Tabs
          orientation='vertical'
          defaultValue='overview'
          className='space-y-4'
        >
          <div className='w-full overflow-x-auto pb-2'>
            <TabsList>
              <TabsTrigger value='overview'>Analytics</TabsTrigger>
              {/* <TabsTrigger value='analytics'>Analytics</TabsTrigger>
              <TabsTrigger value='reports'>Reports</TabsTrigger>
              <TabsTrigger value='notifications'>Notifications</TabsTrigger> */}
            </TabsList>
          </div>
          <TabsContent value='overview' className='space-y-4'>
            {' '}
            <div className='grid grid-cols-1 gap-4 lg:grid-cols-8'>
              <Card className='col-span-1 lg:col-span-4'>
                <CardHeader>
                  <CardTitle>Filter Journals</CardTitle>
                  <CardDescription>Explore our Filter Section</CardDescription>
                </CardHeader>
                <CardContent>
                  {/* <Overview /> */}
                  <AnalyticsForm onCriteriaChange={handleCriteriaChange} />
                  <div className='my-6'>
                    <h3 className='text-lg font-bold'>Selected Criteria</h3>
                    {/* <p className='text-sm text-muted-foreground'>
                      Listed on International Standard Serial Number (ISSN)
                      Portal Listed on International Standard Serial Number
                      (ISSN) Portal Listed on International Standard Serial
                      Number (ISSN) Portal Listed on International Standard
                      Serial Number (ISSN) Portal
                    </p> */}
                    <p className='flex items-center text-sm text-muted-foreground'>
                      {selectedCountry ? (
                        <IconCircleCheck
                          className='mr-2 text-green-500'
                          size={24}
                        />
                      ) : (
                        <IconCircleX className='mr-2 text-red-500' size={24} />
                      )}
                      <strong>Country:</strong>{' '}
                      {selectedCountry || 'Not selected'}
                    </p>
                    <p className='flex items-center text-sm text-muted-foreground'>
                      {selectedThematicArea ? (
                        <IconCircleCheck
                          className='mr-2 text-green-500'
                          size={24}
                        />
                      ) : (
                        <IconCircleX className='mr-2 text-red-500' size={24} />
                      )}
                      <strong>Thematic Area:</strong>{' '}
                      {selectedThematicArea || 'Not selected'}
                    </p>
                    <p className='flex items-center text-sm text-muted-foreground'>
                      {selectedLanguage ? (
                        <IconCircleCheck
                          className='mr-2 text-green-500'
                          size={24}
                        />
                      ) : (
                        <IconCircleX className='mr-2 text-red-500' size={24} />
                      )}
                      <strong>Language:</strong>{' '}
                      {selectedLanguage || 'Not selected'}
                    </p>
                    <p className='flex items-center text-sm text-muted-foreground'>
                      {selectedDoaj === 'yes' ? (
                        <IconCircleCheck
                          className='mr-2 text-green-500'
                          size={24}
                        />
                      ) : (
                        <IconCircleX className='mr-2 text-red-500' size={24} />
                      )}
                      <strong>
                        Listed on Directory of Open Access Journal (DOAJ):
                      </strong>{' '}
                      {selectedDoaj || 'Not selected'}
                    </p>
                    <p className='flex items-center text-sm text-muted-foreground'>
                      {selectedOaj === 'yes' ? (
                        <IconCircleCheck
                          className='mr-2 text-green-500'
                          size={24}
                        />
                      ) : (
                        <IconCircleX className='mr-2 text-red-500' size={24} />
                      )}
                      <strong>Listed on Open Access Journal (OAJ):</strong>{' '}
                      {selectedOaj || 'Not selected'}
                    </p>
                    <p className='flex items-center text-sm text-muted-foreground'>
                      {selectedAfricanPublisher === 'yes' ? (
                        <IconCircleCheck
                          className='mr-2 text-green-500'
                          size={24}
                        />
                      ) : (
                        <IconCircleX className='mr-2 text-red-500' size={24} />
                      )}
                      <strong>Online Publisher Based in Africa:</strong>{' '}
                      {selectedAfricanPublisher || 'Not selected'}
                    </p>
                    <p className='flex items-center text-sm text-muted-foreground'>
                      {selectedInasps === 'yes' ? (
                        <IconCircleCheck
                          className='mr-2 text-green-500'
                          size={24}
                        />
                      ) : (
                        <IconCircleX className='mr-2 text-red-500' size={24} />
                      )}
                      <strong>Hosted on INASP's Journals Online:</strong>{' '}
                      {selectedInasps || 'Not selected'}
                    </p>
                    <p className='flex items-center text-sm text-muted-foreground'>
                      {selectedCope === 'yes' ? (
                        <IconCircleCheck
                          className='mr-2 text-green-500'
                          size={24}
                        />
                      ) : (
                        <IconCircleX className='mr-2 text-red-500' size={24} />
                      )}
                      <strong>
                        Member of Committee on Publication Ethics (COPE):
                      </strong>{' '}
                      {selectedCope || 'Not selected'}
                    </p>
                    <p className='flex items-center text-sm text-muted-foreground'>
                      {selectedIssn === 'yes' ? (
                        <IconCircleCheck
                          className='mr-2 text-green-500'
                          size={24}
                        />
                      ) : (
                        <IconCircleX className='mr-2 text-red-500' size={24} />
                      )}
                      <strong>
                        Listed on International Standard Serial Number (ISSN)
                        Portal:
                      </strong>{' '}
                      {selectedIssn || 'Not selected'}
                    </p>
                    <p className='flex items-center text-sm text-muted-foreground'>
                      {selectedGoogleScholar === true ? (
                        <IconCircleCheck
                          className='mr-2 text-green-500'
                          size={24}
                        />
                      ) : (
                        <IconCircleX className='mr-2 text-red-500' size={24} />
                      )}
                      <strong>Listed on Google Scholar:</strong>{' '}
                      {selectedGoogleScholar === true
                        ? 'Selected'
                        : 'Not Selected'}
                    </p>
                    <p className='flex items-center text-sm text-muted-foreground'>
                      {selectedScopus === true ? (
                        <IconCircleCheck
                          className='mr-2 text-green-500'
                          size={24}
                        />
                      ) : (
                        <IconCircleX className='mr-2 text-red-500' size={24} />
                      )}
                      <strong>Listed on Scopus:</strong>{' '}
                      {selectedScopus === true ? 'Selected' : 'Not Selected'}
                    </p>
                    {/* <button
                      onClick={fetchFilteredJournals}
                      className='mt-4 rounded bg-blue-900 px-4 py-2 text-white'
                    >
                      Search Now
                    </button> */}
                    {/* {!loading ? (
          <button
            onClick={fetchFilteredJournals}
            className="mt-4  rounded bg-blue-900 px-4 py-2 text-white"
          >
            Search Now
          </button>
        ) : (
          <div className=" mt-4 px-4 py-2 h-6 w-6 animate-spin rounded-full border-2 border-blue-900 border-t-transparent"></div>
        )} */}
                    {/* {!loading ? (
  <button
    onClick={fetchFilteredJournals}
    className="mt-4 rounded bg-blue-900 px-4 py-2 text-white hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
    disabled={loading} // Disable the button while loading
  >
    Search Now
  </button>
) : (
<div className="loader"></div>
  
)} */}
                    <div className='mt-4 flex items-center justify-center'>
                      {!loading ? (
                        <button
                          onClick={fetchFilteredJournals}
                          className='rounded bg-blue-900 px-4 py-2 text-white hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500'
                          disabled={loading} // Disable the button while loading
                        >
                          Search Now
                        </button>
                      ) : (
                        <div className='loader'></div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
              <div className='col-span-1 grid grid-cols-2 gap-4 lg:col-span-4'>
                <Card className='col-span-1 lg:col-span-2'>
                  <CardHeader>
                    <CardTitle>Analytics</CardTitle>
                    <CardDescription>Explore our Journals</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>TITLE</TableHead>
                          <TableHead>PUBLISHER</TableHead>
                          <TableHead>CATEGORY</TableHead>
                          {/* <TableHead>CITATION COUNT</TableHead>
                          <TableHead>PUBLISHED</TableHead> */}
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {journals.map((journal, index) => (
                          <TableRow key={index}>
                            <TableCell>
                              <Link to={`/journals/${journal.id}`}>
                                {journal.journal_title
                                  ? journal.journal_title
                                  : 'journal title unspecified'}{' '}
                              </Link>
                            </TableCell>
                            <TableCell>
                              {journal.publishers_name
                                ? journal.publishers_name
                                : 'publisher unspecified'}
                            </TableCell>
                            <TableCell>
                              {journal.thematic_area
                                ? journal.thematic_area.thematic_area
                                : 'thematic area not specified'}
                            </TableCell>
                            {/* <TableCell>25</TableCell>
                          <TableCell>Yes</TableCell> */}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
                <Card className='col-span-1 lg:col-span-1'>
                  <CardHeader>
                    <CardTitle>Journals Distribution per Country</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RadialStacked
                      percentage={65}
                      title='Journals Distribution per Country'
                    />
                  </CardContent>
                </Card>
                <Card className='col-span-1 lg:col-span-1'>
                  <CardHeader>
                    <CardTitle>Journals</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RadialStacked percentage={87} title='Scopus' />
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </Layout.Body>
    </Layout>
  )
}

// const topNav = [
//   {
//     title: 'Overview',
//     href: 'dashboard/overview',
//     isActive: true,
//   },
// ]
const topNav = [
  {
    title: 'Overview',
    href: 'dashboard/overview',
    isActive: true,
  },
]
