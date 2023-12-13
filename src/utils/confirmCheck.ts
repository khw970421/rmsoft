const confirmCheck = async (confirmText: string, execFunc: () => void) => {
  if (confirm(confirmText)) {
    execFunc()
  }
}
export default confirmCheck