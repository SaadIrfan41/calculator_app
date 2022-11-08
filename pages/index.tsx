import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  Grid,
  GridItem,
} from '@chakra-ui/react'
import { useReducer } from 'react'

enum Operations {
  ADD_NUMBER = 'adding_number',
  SUBTRACT_NUMBER = 'subtracting_number',
  ALL_CLEAR = 'all_clear',
  DELETE_NUMBER = 'delete_number',
  EQUAL = 'equal',
  CHOOSE_OPERATION = 'choose_operation',
}

// An interface for our actions
interface ActionTypes {
  type: Operations
  payload: string
}

// // An interface for our state
interface StateTypes {
  currentValue: string
  prevValue: string
  overwrite: boolean

  operand: string
}

const reducer = (state: StateTypes, { type, payload }: ActionTypes) => {
  // console.log()

  // console.log(parseInt(state.currentValue, 10))
  // console.log(payload, state.currentValue)
  if (payload === '0' && state.currentValue === '0') {
    return state
  }
  if (payload === '.' && state.currentValue.includes('.')) {
    return state
  }
  if (state.currentValue?.charAt(0) === '0') {
    state.currentValue = state.currentValue.substring(1)
  }
  switch (type) {
    case Operations.ADD_NUMBER:
      if (state.currentValue?.length >= 32) {
        return state
      }
      if (state.overwrite) {
        return {
          ...state,
          currentValue: payload,
          overwrite: false,
        }
      }
      return {
        ...state,
        currentValue: `${state.currentValue}${payload}`,
      }

    case Operations.CHOOSE_OPERATION:
      if (state.currentValue == null && state.prevValue == null) {
        return state
      }
      console.log('CURRENT', state.currentValue)
      if (state.currentValue === '') {
        console.log('HELLO')
        return { ...state, operand: payload, currentValue: '0' }
      }
      if (state.prevValue == null) {
        return {
          ...state,
          operand: payload,
          prevValue: state.currentValue,
          currentValue: '0',
        }
      }
      return {
        ...state,
        operand: payload,
        prevValue: calculateValues(state),
        currentValue: '0',
      }
    case Operations.EQUAL:
      if (
        state.currentValue == null ||
        state.prevValue == null ||
        state.operand == null
      ) {
        return state
      }
      return {
        ...state,
        operand: null,
        prevValue: null,
        overwrite: true,
        currentValue: calculateValues(state),
      }

    case Operations.DELETE_NUMBER:
      console.log(state.currentValue)
      if (state.currentValue === '') {
        return state
      }
      if (state.overwrite) {
        return { ...state, overwrite: false, currentValue: '0' }
      }
      if (state.currentValue.length === 1) {
        return { ...state, currentValue: '0' }
      }
      if (state.currentValue == null) {
        return state
      }

      return {
        ...state,

        currentValue: state.currentValue.slice(0, -1),
      }
    case Operations.ALL_CLEAR:
      return { currentValue: '0' }

    default:
      break
  }
  return {}
}
function calculateValues({ currentValue, prevValue, operand }: StateTypes) {
  // console.log(Math.floor(currentValue), +prevValue)
  const prev = parseFloat(prevValue)
  const current = parseFloat(currentValue)
  console.log('CURRENT', current, 'PREV', prev)
  if (isNaN(current) || isNaN(prev)) {
    return ''
  }
  let answer = 0
  switch (operand) {
    case '+':
      answer = prev + current
      break
    case '-':
      answer = prev - current
      break

    case '/':
      answer = prev / current
      break

    case '*':
      answer = prev * current
      break
  }
  return answer.toString()
}

const initialState = { currentValue: '0' }

export default function Home() {
  const [{ currentValue, prevValue, operand }, dispatch] = useReducer(
    reducer,
    initialState
  )
  return (
    <Box w='100%' h='100vh' bgGradient='linear(to-l, #7928CA, #FF0080)'>
      <Center h='100vh'>
        <Container maxW='sm'>
          <Flex
            color='white'
            direction={'column'}
            alignItems={'end'}
            rounded='md'
            bgGradient='linear(to-l, #12091bce, #2b1b23)'
            p='3'
            mb={1}
            height='80px'
          >
            <Box pb={2} fontSize='md' color='whiteAlpha.700'>
              {prevValue} {operand}
            </Box>

            <Box fontSize='2xl' maxW={'sm'}>
              {currentValue}
            </Box>
          </Flex>
          <Grid
            templateRows='repeat(2, 1fr)'
            templateColumns='repeat(4, 1fr)'
            gap={4}
          >
            <GridItem colSpan={2}>
              <Button
                colorScheme='teal'
                size='md'
                width={'100%'}
                fontSize='2xl'
                onClick={() => dispatch({ type: Operations.ALL_CLEAR })}
              >
                AC
              </Button>
            </GridItem>

            <Button
              colorScheme='teal'
              size='md'
              fontSize='2xl'
              onClick={() => dispatch({ type: Operations.DELETE_NUMBER })}
            >
              DEL
            </Button>
            <Button
              colorScheme='teal'
              size='md'
              fontSize='2xl'
              onClick={() =>
                dispatch({ type: Operations.CHOOSE_OPERATION, payload: '/' })
              }
            >
              /
            </Button>
            <Button
              colorScheme='teal'
              size='md'
              variant='outline'
              onClick={() =>
                dispatch({ type: Operations.ADD_NUMBER, payload: '1' })
              }
            >
              1
            </Button>
            <Button
              colorScheme='teal'
              size='md'
              variant='outline'
              onClick={() =>
                dispatch({ type: Operations.ADD_NUMBER, payload: '2' })
              }
            >
              2
            </Button>
            <Button
              colorScheme='teal'
              size='md'
              variant='outline'
              onClick={() =>
                dispatch({ type: Operations.ADD_NUMBER, payload: '3' })
              }
            >
              3
            </Button>
            <Button
              alignItems={'end'}
              colorScheme='teal'
              size='md'
              fontSize='2xl'
              onClick={() =>
                dispatch({ type: Operations.CHOOSE_OPERATION, payload: '*' })
              }
            >
              *
            </Button>
            <Button
              colorScheme='teal'
              size='md'
              variant='outline'
              onClick={() =>
                dispatch({ type: Operations.ADD_NUMBER, payload: '4' })
              }
            >
              4
            </Button>
            <Button
              colorScheme='teal'
              size='md'
              variant='outline'
              onClick={() =>
                dispatch({ type: Operations.ADD_NUMBER, payload: '5' })
              }
            >
              5
            </Button>
            <Button
              colorScheme='teal'
              size='md'
              variant='outline'
              onClick={() =>
                dispatch({ type: Operations.ADD_NUMBER, payload: '6' })
              }
            >
              6
            </Button>
            <Button
              colorScheme='teal'
              size='md'
              fontSize='2xl'
              onClick={() =>
                dispatch({ type: Operations.CHOOSE_OPERATION, payload: '+' })
              }
            >
              +
            </Button>
            <Button
              colorScheme='teal'
              size='md'
              variant='outline'
              onClick={() =>
                dispatch({ type: Operations.ADD_NUMBER, payload: '7' })
              }
            >
              7
            </Button>
            <Button
              colorScheme='teal'
              size='md'
              variant='outline'
              onClick={() =>
                dispatch({ type: Operations.ADD_NUMBER, payload: '8' })
              }
            >
              8
            </Button>
            <Button
              colorScheme='teal'
              size='md'
              variant='outline'
              onClick={() =>
                dispatch({ type: Operations.ADD_NUMBER, payload: '9' })
              }
            >
              9
            </Button>
            <Button
              colorScheme='teal'
              size='md'
              fontSize='2xl'
              onClick={() =>
                dispatch({ type: Operations.CHOOSE_OPERATION, payload: '-' })
              }
            >
              -
            </Button>
            <Button
              alignItems={'baseline'}
              colorScheme='teal'
              size='md'
              fontSize='2xl'
              onClick={() =>
                dispatch({ type: Operations.ADD_NUMBER, payload: '.' })
              }
            >
              .
            </Button>
            <Button
              colorScheme='teal'
              size='md'
              variant='outline'
              onClick={() =>
                dispatch({ type: Operations.ADD_NUMBER, payload: '0' })
              }
            >
              0
            </Button>
            <GridItem colSpan={2}>
              <Button
                colorScheme='teal'
                size='md'
                width={'100%'}
                fontSize='xl'
                onClick={() => dispatch({ type: Operations.EQUAL })}
              >
                =
              </Button>
            </GridItem>
          </Grid>
        </Container>
      </Center>
    </Box>
  )
}
