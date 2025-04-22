import { ArrowRight } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCallback } from "react";

interface MultipleFileLanguageProps {
  masterLang: string;
  setMasterLang: (lang: string) => void;
  slaveLang: string;
  setSlaveLang: (lang: string) => void;
}

const languages = ["Uzbek", "English", "Russian", 'Ўзбек'];

const FileLanguage: React.FC<MultipleFileLanguageProps> = ({
  masterLang,
  setMasterLang,
  slaveLang,
  setSlaveLang,
}) => {
  const handleSlaveLangChange = useCallback(
    (value: string) => {
      if (value === masterLang) {
        setMasterLang(slaveLang);
      }
      setSlaveLang(value);
    },
    [masterLang, slaveLang, setMasterLang, setSlaveLang]
  );

  const handleMasterLangChange = useCallback(
    (value: string) => {
      if (value === slaveLang) {
        setSlaveLang(masterLang);
      }
      setMasterLang(value);
    },
    [masterLang, slaveLang, setMasterLang, setSlaveLang]
  );

  return (
    <div className="flex items-center justify-between w-full p-3 border border-gray-200 rounded-lg">
      <LanguageSelect value={masterLang} onChange={handleMasterLangChange} placeholder="Select Source Language" />

      <div className="flex items-center px-4">
        <span className="text-blue-600 font-medium flex items-center">
          <span className='hidden sm:block'>Translate to</span>
          <ArrowRight className="ml-2 w-4 h-4" />
        </span>
      </div>

      <LanguageSelect value={slaveLang} onChange={handleSlaveLangChange} placeholder="Select Target Language" />
    </div>
  );
};

interface LanguageSelectProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}

const LanguageSelect: React.FC<LanguageSelectProps> = ({ value, onChange, placeholder }) => (
  <Select onValueChange={onChange} value={value}>
    <SelectTrigger className="w-[180px]">
      <SelectValue placeholder={placeholder} />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        {languages.map((lang) => (
          <SelectItem key={lang} value={lang}>
            {lang}
          </SelectItem>
        ))}
      </SelectGroup>
    </SelectContent>
  </Select>
);

export default FileLanguage;
