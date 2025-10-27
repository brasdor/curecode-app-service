export function extractTextFromProseMirror(doc: any): string {
  if (!doc || !doc.content) return ""

  let text = ""

  for (const node of doc.content) {
    if (node.type === "text") {
      text += node.text || ""
    } else if (node.content) {
      text += extractTextFromProseMirror(node)
    }
    if (node.type === "paragraph" || node.type === "heading") {
      text += "\n" // Add newlines
    }
  }

  return text.trim()
}
