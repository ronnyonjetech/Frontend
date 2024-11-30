/**
 * v0 by Vercel.
 * @see https://v0.dev/t/FAt2GlkdQrf
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Label } from '@/components/ui/label'
// import { Select, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { useState, useEffect } from 'react'

// Country interface to type the fetched data
interface Country {
  id: number
  country: string
  created_at: string
}
interface ThematicArea {
  id: number
  thematic_area: string
  created_at: string
}
interface Language {
  id: number
  language: string
  created_at: string
}
// interface AnalyticsFormProps {
//   onCriteriaChange: (country: string, thematicArea: string, language: string,doaj:string,oaj:string,ap:string,inasps:string,cope:string,issn:string) => void;
// }

interface AnalyticsFormProps {
  onCriteriaChange: (
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
  ) => void;
}

export default function AnalyticsForm({ onCriteriaChange }: AnalyticsFormProps) {
  const [countries, setCountries] = useState<Country[]>([])
  const [thematicAreas, setThematicAreas] = useState<ThematicArea[]>([])
  const [languages, setLanguages] = useState<Language[]>([])

  const [selectedCountry, setSelectedCountry] = useState<string>('') 
  const [selectedDiscipline, setSelectedDiscipline] = useState<string>('') 
  const [selectedLanguage, setSelectedLanguage] = useState<string>('') 
  const [googleScholar, setGoogleScholar] = useState<boolean>(false)
  const [scopus, setScopus] = useState<boolean>(false)
  const [selectedDoaj, setSelectedDoaj] = useState<string>('') 
  const [selectedOaj, setSelectedOaj] = useState<string>('') 
  const[selectedAfricanPublisher,setSelectedAfricanPublisher]=useState<string>('') 
  const[selectedInasps,setSelectedInasps]=useState<string>('') 
  const[selectedCope,setCope]=useState<string>('') 
  const[selectedIssn,setIssn]=useState<string>('')
  //const [doaj, setDoaj] = useState<string>('') 
  // useEffect to trigger onCriteriaChange whenever any criteria change
  // useEffect(() => {
  //   onCriteriaChange(selectedCountry, selectedDiscipline, selectedLanguage,selectedDoaj,selectedOaj,selectedAfricanPublisher,selectedInasps,selectedCope,selectedIssn);
  // }, [selectedCountry, selectedDiscipline, selectedLanguage, googleScholar, scopus, onCriteriaChange]);


  useEffect(() => {
    onCriteriaChange(
      selectedCountry,
      selectedDiscipline,
      selectedLanguage,
      selectedDoaj,
      selectedOaj,
      selectedAfricanPublisher,
      selectedInasps,
      selectedCope,
      selectedIssn,
      googleScholar,
      scopus
    );
  }, [
    selectedCountry,
    selectedDiscipline,
    selectedLanguage,
    selectedDoaj,
    selectedOaj,
    selectedAfricanPublisher,
    selectedInasps,
    selectedCope,
    selectedIssn,
    googleScholar,
    scopus,
    onCriteriaChange,
  ]);
  // Fetch countries data from the API
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(
          'https://aphrc.site/journal_api/api/country/'
        )
        const data = await response.json()
        setCountries(data)
      } catch (error) {
        console.error('Error fetching countries:', error)
      }
    }
    fetchCountries()
  }, [])

  // Fetch thematic areas data from the API
  useEffect(() => {
    const fetchThematicAreas = async () => {
      try {
        const response = await fetch(
          'https://aphrc.site/journal_api/api/thematic/'
        )
        const data = await response.json()
        setThematicAreas(data)
      } catch (error) {
        console.error('Error fetching thematic areas:', error)
      }
    }
    fetchThematicAreas()
  }, [])

  // Fetch language data from the API
  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const response = await fetch(
          'https://aphrc.site/journal_api/api/languages/'
        )
        const data = await response.json()
        setLanguages(data)
      } catch (error) {
        console.error('Error fetching languages:', error)
      }
    }
    fetchLanguages()
  }, [])

  return (
    <section>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2'>
        <div className='space-y-2'>
          <Label htmlFor='country'>Country</Label>
          {/* <Select>
            <SelectTrigger id='country'>
              <SelectValue placeholder='All Countries' />
            </SelectTrigger>
             
          </Select> */}
          <Select onValueChange={(value) => setSelectedCountry(value)}>
            <SelectTrigger id='country'>
              <SelectValue placeholder='All Countries' />
            </SelectTrigger>
            {/* <SelectContent className="max-h-40 overflow-y-auto w-80">
              {countries.map((country) => (
                <SelectItem key={country.id} value={country.country}>
                  {country.country}
                </SelectItem>
              ))}
            </SelectContent> */}
            <SelectContent className='max-h-40 w-80 overflow-y-auto'>
              {countries.length > 0 ? (
                countries.map((country) => (
                  <SelectItem key={country.id} value={country.country}>
                    {country.country}
                  </SelectItem>
                ))
              ) : (
                <SelectItem disabled value='none'>
                  No countries available
                </SelectItem>
              )}
            </SelectContent>
          </Select>
        </div>
        <div className='space-y-2'>
          <Label htmlFor='discipline'>Discipline</Label>
          <Select onValueChange={(value) => setSelectedDiscipline(value)}>
            <SelectTrigger id='discipline' className='w-full'>
              <SelectValue placeholder='All Disciplines' />
            </SelectTrigger>
            {/* <SelectContent className='max-h-40 w-80 overflow-y-auto'>
              {thematicAreas.map((area) => (
                <SelectItem key={area.id} value={area.thematic_area}>
                  {area.thematic_area}
                </SelectItem>
              ))}
            </SelectContent> */}
            <SelectContent className='max-h-40 w-80 overflow-y-auto'>
              {thematicAreas.length > 0 ? (
                thematicAreas.map((area) => (
                  <SelectItem key={area.id} value={area.thematic_area}>
                    {area.thematic_area}
                  </SelectItem>
                ))
              ) : (
                <SelectItem disabled value='none'>
                  No thematic areas available
                </SelectItem>
              )}
            </SelectContent>
          </Select>
        </div>
        <div className='space-y-2'>
          <Label htmlFor='language'>Language</Label>
          <Select onValueChange={(value) => setSelectedLanguage(value)}>
            <SelectTrigger id='language'>
              <SelectValue placeholder='All Languages' />
            </SelectTrigger>
            {/* <SelectContent className='max-h-40 w-80 overflow-y-auto'>
              {languages.map((language) => (
                <SelectItem key={language.id} value={language.language}>
                  {language.language}
                </SelectItem>
              ))}
            </SelectContent> */}
            <SelectContent className='max-h-40 w-80 overflow-y-auto'>
              {languages.length > 0 ? (
                languages.map((language) => (
                  <SelectItem key={language.id} value={language.language}>
                    {language.language}
                  </SelectItem>
                ))
              ) : (
                <SelectItem disabled value='none'>
                  No languages available
                </SelectItem>
              )}
            </SelectContent>
          </Select>
        </div>
        <div className='space-y-2'>
          <Label htmlFor='indexed-on'>Indexed on</Label>
          <div className='flex items-center space-x-2'>
            {/* <Checkbox id='google-scholar'  checked={googleScholar} 
              onCheckedChange={(checked) => setGoogleScholar(checked)}  /> */}
            <Checkbox
                id="google-scholar"
                checked={googleScholar}
                onCheckedChange={(checked) => setGoogleScholar(checked === true)}
              />
            <Label htmlFor='google-scholar'>Google Scholar</Label>
            {/* <Checkbox id='scopus' checked={scopus} 
              onCheckedChange={(checked) => setScopus(checked)}  /> */}
              <Checkbox
                id="scopus"
                checked={scopus}
                onCheckedChange={(checked) => setScopus(checked === true)}
              />
            <Label htmlFor='scopus'>Scopus</Label>
          </div>
        </div>
        <div className='space-y-2'>
          <Label htmlFor='doaj'>
            Listed on Directory of Open Access Journal (DOAJ)
          </Label>
          <Select onValueChange={(value) => setSelectedDoaj(value)}>
            <SelectTrigger id='doaj'>
              <SelectValue placeholder='Any' />
            </SelectTrigger>
            <SelectContent className='max-h-40 overflow-y-auto'>
              <SelectItem value='yes'>Yes</SelectItem>
              <SelectItem value='no'>No</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className='space-y-2'>
          <Label htmlFor='oaj'>Listed on Open Access Journal (OAJ)</Label>
          <Select onValueChange={(value) => setSelectedOaj(value)}>
            <SelectTrigger id='oaj'>
              <SelectValue placeholder='Any' />
            </SelectTrigger>
            <SelectContent className='max-h-40 overflow-y-auto'>
              <SelectItem value='yes'>Yes</SelectItem>
              <SelectItem value='no'>No</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className='space-y-2'>
          <Label htmlFor='publisher-africa'>
            Online Publisher Based in Africa
          </Label>
          <Select onValueChange={(value) => setSelectedAfricanPublisher(value)}>
            <SelectTrigger id='publisher-africa'>
              <SelectValue placeholder='Any' />
            </SelectTrigger>
            <SelectContent className='max-h-40 overflow-y-auto'>
              <SelectItem value='yes'>Yes</SelectItem>
              <SelectItem value='no'>No</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className='space-y-2'>
          <Label htmlFor='inasp'>Hosted on INASP's Journals Online</Label>
          <Select onValueChange={(value) => setSelectedInasps(value)}>
            <SelectTrigger id='inasp'>
              <SelectValue placeholder='Any' />
            </SelectTrigger>
            <SelectContent className='max-h-40 overflow-y-auto'>
              <SelectItem value='yes'>Yes</SelectItem>
              <SelectItem value='no'>No</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className='space-y-2'>
          <Label htmlFor='cope'>
            Member of Committee on Publication Ethics (COPE)
          </Label>
          <Select onValueChange={(value) => setCope(value)}>
            <SelectTrigger id='cope'>
              <SelectValue placeholder='Any' />
            </SelectTrigger>
            <SelectContent className='max-h-40 overflow-y-auto'>
              <SelectItem value='yes'>Yes</SelectItem>
              <SelectItem value='no'>No</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className='space-y-2'>
          <Label htmlFor='issn'>
            Listed on International Standard Serial Number (ISSN) Portal
          </Label>
          <Select onValueChange={(value) =>setIssn(value)}>
            <SelectTrigger id='issn'>
              <SelectValue placeholder='Any' />
            </SelectTrigger>
            <SelectContent className='max-h-40 overflow-y-auto'>
              <SelectItem value='yes'>Yes</SelectItem>
              <SelectItem value='no'>No</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </section>
  )
}