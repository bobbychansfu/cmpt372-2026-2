import { useEffect, useRef, useState } from "react";
import type { PersonType } from "../types/PersonType";

function useFetchRandomPerson(trigger: number) {
  const [people, setPeople] = useState<PersonType[]>([]);
  const [loading, setLoading] = useState(false);
  const nextId = useRef(1);

  useEffect(() => {
    if (trigger === 0) return; // avoid initial fetch if desired

    async function fetchUser() {
      try {
        setLoading(true);

        await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
        const response = await fetch("https://randomuser.me/api/");
        const data = await response.json();

        const seed = data.info.seed;
        const name = data.results[0].name.first;
        const imgUrl = data.results[0].picture.large;

        setPeople((prevPeople) => [
          ...prevPeople,
          { id: nextId.current++, name, imgUrl, seed }
        ]);
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, [trigger]);

  return { people, loading, setPeople };
}

export default useFetchRandomPerson;