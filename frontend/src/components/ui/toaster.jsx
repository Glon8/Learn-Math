function _optionalChain(ops) {
  let lastAccessLHS = undefined
  let value = ops[0]
  let i = 1
  while (i < ops.length) {
    const op = ops[i]
    const fn = ops[i + 1]
    i += 2
    if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) {
      return undefined
    }
    if (op === 'access' || op === 'optionalAccess') {
      lastAccessLHS = value
      value = fn(value)
    } else if (op === 'call' || op === 'optionalCall') {
      value = fn((...args) => value.call(lastAccessLHS, ...args))
      lastAccessLHS = undefined
    }
  }
  return value
}
; ('use client')

import {
  Toaster as ChakraToaster,
  Portal,
  Spinner,
  Stack,
  Toast,
  createToaster,
} from '@chakra-ui/react'

export const toasterBottom = createToaster({
  placement: "bottom-end",
  pauseOnPageIdle: true,
})

export const toasterTop = createToaster({
  placement: "top-end",
  pauseOnPageIdle: true,
})

export const BottomToaster = () => {
  return (
    <Portal>
      <ChakraToaster toaster={toasterBottom} insetInline={{ mdDown: '4' }}>
        {(toast) => (
          <Toast.Root width={{ md: 'sm' }}
            border
            borderWidth={1}
            _light={{
              borderColor: '#B1B7BA'
            }}
            _dark={{
              background: '#1D282E/95',
              borderColor: '#1D282E'
            }}>
            {toast.type === 'loading' ? (
              <Spinner size='sm' color='blue.solid' />
            ) : (
              <Toast.Indicator />
            )}
            <Stack gap='1' flex='1' maxWidth='100%'>
              {toast.title && <Toast.Title fontWeight={'bold'}
                fontSize={{ base: 'lg', sm: 'lg', md: 'lg', lg: 'sm' }}>{toast.title}</Toast.Title>}
              {toast.description && (
                <Toast.Description fontWeight={'medium'}
                  fontSize={{ base: 'md', sm: 'md', md: 'md', lg: 'sm' }}
                >{toast.description}</Toast.Description>
              )}
            </Stack>
            {toast.action && (
              <Toast.ActionTrigger>{toast.action.label}</Toast.ActionTrigger>
            )}
            {_optionalChain([
              toast,
              'access',
              (_) => _.meta,
              'optionalAccess',
              (_2) => _2.closable,
            ]) && <Toast.CloseTrigger />}
          </Toast.Root>
        )}
      </ChakraToaster>
    </Portal>
  )
}

export const TopToaster = () => {
  return (
    <Portal>
      <ChakraToaster toaster={toasterTop} insetInline={{ mdDown: '4' }}>
        {(toast) => (
          <Toast.Root width={{ md: 'sm' }}
            border
            borderWidth={1}
            _light={{
              borderColor: '#B1B7BA'
            }}
            _dark={{
              background: '#1D282E/95',
              borderColor: '#1D282E'
            }}>
            {toast.type === 'loading' ? (
              <Spinner size='sm' color='blue.solid' />
            ) : (
              <Toast.Indicator />
            )}
            <Stack gap='1' flex='1' maxWidth='100%'>
              {toast.title && <Toast.Title fontWeight={'bold'}
                fontSize={{ base: 'lg', sm: 'lg', md: 'lg', lg: 'sm' }}>{toast.title}</Toast.Title>}
              {toast.description && (
                <Toast.Description fontWeight={'medium'}
                  fontSize={{ base: 'md', sm: 'md', md: 'md', lg: 'sm' }}
                >{toast.description}</Toast.Description>
              )}
            </Stack>
            {toast.action && (
              <Toast.ActionTrigger>{toast.action.label}</Toast.ActionTrigger>
            )}
            {_optionalChain([
              toast,
              'access',
              (_) => _.meta,
              'optionalAccess',
              (_2) => _2.closable,
            ]) && <Toast.CloseTrigger />}
          </Toast.Root>
        )}
      </ChakraToaster>
    </Portal>
  )
}
