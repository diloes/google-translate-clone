import { useReducer } from 'react'
import { Action, FromLanguage, Language, type State } from '../types'
import { AUTO_LANGUAGE } from '../constants'

const initialState: State = {
  fromLanguage: 'auto',
  toLanguage: 'en',
  fromText: '',
  result: '',
  loading: false
}

function reducer(state: State, action: Action) {
  const { type } = action

  if (type === 'INTERCHANGE_LANGUAGES') {
    /**
     * La lógica (como esta condición 👇 ) en el reducer es mucho más fácil de testar que si
     * la ponemos en los componentes. Por ello lo recomendable es ponerla aquí
     */
    if (state.fromLanguage === AUTO_LANGUAGE) return state

    return {
      ...state,
      fromLanguage: state.toLanguage,
      toLanguage: state.fromLanguage
    }
  }

  if (type === 'SET_FROM_LANGUAGE') {
    return {
      ...state,
      fromLanguage: action.payload
    }
  }

  if (type === 'SET_TO_LANGUAGE') {
    return {
      ...state,
      toLanguage: action.payload
    }
  }

  if (type === 'SET_FROM_TEXT') {
    return {
      ...state,
      loading: true,
      fromText: action.payload,
      result: ''
    }
  }

  if (type === 'SET_RESULT') {
    return {
      ...state,
      result: action.payload
    }
  }

  return state
}

export function useStore() {
  const [{ fromLanguage, toLanguage, fromText, result, loading }, dispatch] = useReducer(
    reducer,
    initialState
  )

  function interchangeLanguages() {
    dispatch({ type: 'INTERCHANGE_LANGUAGES' })
  }

  function setFromLanguage(payload: FromLanguage) {
    dispatch({ type: 'SET_FROM_LANGUAGE', payload })
  }

  function setToLanguage(payload: Language) {
    dispatch({ type: 'SET_TO_LANGUAGE', payload })
  }

  function setFromText(payload: string) {
    dispatch({ type: 'SET_FROM_TEXT', payload })
  }

  function setResult(payload: string) {
    dispatch({ type: 'SET_RESULT', payload })
  }

  return {
    fromLanguage,
    toLanguage,
    fromText,
    result,
    loading,
    interchangeLanguages,
    setFromLanguage,
    setToLanguage,
    setFromText,
    setResult
  }
}
