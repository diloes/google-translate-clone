import 'bootstrap/dist/css/bootstrap.min.css'

import { Button, Container, Row, Col, Stack } from 'react-bootstrap'

import './App.css'
import { useStore } from './hooks/useStore'
import { AUTO_LANGUAGE } from './constants'
import { ArrowsIcons } from './components/Icons'
import { LanguageSelector } from './components/LanguageSelector'
import { SectionType } from './types.d'
import { TextArea } from './components/TextArea'
import { useEffect } from 'react'
import { translate } from './services/translate'

function App() {
  const {
    fromLanguage,
    fromText,
    toLanguage,
    result,
    loading,
    setFromLanguage,
    setToLanguage,
    interchangeLanguages,
    setFromText,
    setResult
  } = useStore()

  useEffect(() => {
    if (fromText === '') return
    translate({ fromLanguage, toLanguage, text: fromText })
      .then((result) => {
        if (result == null) return
        setResult(result)
      })
      .catch(() => {
        setResult('Error')
      })
  }, [fromText, fromLanguage])

  return (
    <Container fluid>
      <h2>Google Translate</h2>
      <Row>
        <Col>
          <Stack gap={2}>
            <LanguageSelector
              type={SectionType.From}
              value={fromLanguage}
              onChange={setFromLanguage}
            />
            <TextArea type={SectionType.From} value={fromText} onChange={setFromText} />
          </Stack>
        </Col>

        <Col xs='auto'>
          <Button
            variant='link'
            disabled={fromLanguage === AUTO_LANGUAGE}
            onClick={interchangeLanguages}
          >
            <ArrowsIcons />
          </Button>
        </Col>

        <Col>
          <Stack gap={2}>
            <LanguageSelector
              type={SectionType.To}
              value={toLanguage}
              onChange={setToLanguage}
            />
            <TextArea
              type={SectionType.To}
              value={result}
              onChange={setResult}
              loading={loading}
            />
          </Stack>
        </Col>
      </Row>
    </Container>
  )
}

export default App
