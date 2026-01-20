"use client";

import { useRouter } from "next/navigation";

type SelectCountryProps = {
  country: string;
};

export default function SelectCountry({ country }: SelectCountryProps) {
  const router = useRouter();
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCountry = e.target.value;
    router.push(`/?country=${selectedCountry}`);
  };
  return (
    <>
      <div className="flex items-center gap-5 capitalize">
        <p>search by country:</p>
        <select
          value={country}
          onChange={handleSelectChange}
          className="px-5 w-44 py-2 border rounded-md text-gray-300 focus:outline-none"
        >
          <option className="text-red-600 capitalize" value="us">
            USA
          </option>
          <option className="text-red-600 capitalize" value="uk">
            uk
          </option>
          <option className="text-red-600 capitalize" value="fr">
            France
          </option>
          <option className="text-red-600 capitalize" value="de">
            Germany
          </option>
          <option className="text-red-600 capitalize" value="in">
            India
          </option>
          <option className="text-red-600 capitalize" value="ca">
            Canada
          </option>
          <option className="text-red-600 capitalize" value="au">
            Australia
          </option>
          <option className="text-red-600 capitalize" value="jp">
            Japan
          </option>
          <option className="text-red-600 capitalize" value="cn">
            China
          </option>
          <option className="text-red-600 capitalize" value="br">
            Brazil
          </option>
          <option className="text-red-600 capitalize" value="ru">
            Russia
          </option>
        </select>
      </div>
    </>
  );
}
