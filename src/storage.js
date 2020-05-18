const storageKeys = {
  oldInputKey: 'noodle:input',
  lastOpenDocument: 'noodle:last-open-document',
  savedDocuments: 'noodle:saved-documents',
};

export function getLastOpenDocument(fallback) {
  const lastOpenDocument = localStorage.getItem(storageKeys.lastOpenDocument);

  if (lastOpenDocument) {
    return JSON.parse(lastOpenDocument);
  }

  // Migrate data saved with the old input format
  const oldInput = localStorage.getItem(storageKeys.oldInputKey);

  return oldInput
    ? { title: 'Untitled', content: oldInput, saved: false }
    : fallback;
}

export function setLastOpenDocument(doc) {
  localStorage.setItem(storageKeys.lastOpenDocument, JSON.stringify(doc));
}

export function getSavedDocumentTitles() {
  const savedDocuments = localStorage.getItem(storageKeys.savedDocuments);
  return savedDocuments ? Object.keys(JSON.parse(savedDocuments)) : [];
}

export function loadDocument(title, fallback = null) {
  const savedDocuments = localStorage.getItem(storageKeys.savedDocuments);
  const doc = savedDocuments ? JSON.parse(savedDocuments)[title] : undefined;
  return doc ? doc : fallback;
}

export function saveDocument(doc) {
  const savedDocuments = localStorage.getItem(storageKeys.savedDocuments);
  const updatedDocuments = Object.assign(
    {},
    savedDocuments ? JSON.parse(savedDocuments) : {},
    {
      [doc.title]: doc,
    }
  );
  localStorage.setItem(
    storageKeys.savedDocuments,
    JSON.stringify(updatedDocuments)
  );
}
