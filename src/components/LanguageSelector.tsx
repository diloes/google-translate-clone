import { type FC, type ChangeEvent } from 'react'
import { Form } from 'react-bootstrap'
import { AUTO_LANGUAGE, SUPPORTED_LANGUAGES } from '../constants'
import { type FromLanguage, type Language, SectionType } from '../types.d'

type Props =
  | {
      type: SectionType.From
      value: FromLanguage
      onChange: (language: Language) => void
    }
  | { type: SectionType.To; value: Language; onChange: (language: Language) => void }

export const LanguageSelector: FC<Props> = ({ onChange, value, type }) => {
  function handleChange(event: ChangeEvent<HTMLSelectElement>) {
    onChange(event.target.value as Language)
  }

  return (
    <Form.Select aria-label='Selecciona el idioma' onChange={handleChange} value={value}>
      {type === SectionType.From && (
        <option value={AUTO_LANGUAGE}>Detectar Idioma</option>
      )}

      {Object.entries(SUPPORTED_LANGUAGES).map(([key, literal]) => (
        <option key={key} value={key}>
          {literal}
        </option>
      ))}
    </Form.Select>
  )
}
