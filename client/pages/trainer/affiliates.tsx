import { TrainerLayout } from "@/components/TrainerLayout";
import { useAffiliates } from '@/hooks/useAffiliates'
import {Trainer as Members} from '@/components/SearchMembers/Trainer'
import { useState, useMemo } from "react";

export default function TrainerPlans () {
  const affiliates = useAffiliates()
  const [searchResults, setSearchResults] = useState<any[]>([])

  const search = (value: string) => {
    if (value) {
      const filtered = affiliates.filter((affiliate: any)=> affiliate.name.toLowerCase().includes(value.toLowerCase()))
      if (filtered.length > 0) {
        setSearchResults(filtered)
      }
    } else {
      setSearchResults([])
    }
  }

  const shown = useMemo(()=> searchResults.length > 0 ? searchResults : affiliates, [searchResults, affiliates])

  return (
    <TrainerLayout onSearch={search} placeholder="Buscar afiliados...">
      <Members affiliates={shown} />
    </TrainerLayout>
  )
}