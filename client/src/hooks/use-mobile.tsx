import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean>(false)

  React.useEffect(() => {
    // Detecta dispositivos móveis por tamanho de tela E por capacidade de toque
    const checkMobile = () => {
      const isTouchDevice = 'ontouchstart' in window || 
                            navigator.maxTouchPoints > 0 ||
                            (navigator as any).msMaxTouchPoints > 0
      const isSmallScreen = window.innerWidth < MOBILE_BREAKPOINT
      
      setIsMobile(isSmallScreen || isTouchDevice)
    }
    
    // Verificar na montagem inicial
    checkMobile()
    
    // Adicionar listener para mudanças de tamanho
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    mql.addEventListener("change", checkMobile)
    
    window.addEventListener('resize', checkMobile)
    
    return () => {
      mql.removeEventListener("change", checkMobile)
      window.removeEventListener('resize', checkMobile)
    }
  }, [])

  return isMobile
}
