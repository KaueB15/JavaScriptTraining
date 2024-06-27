// DOM

const addNoteButton = document.querySelector(".add-note")
const addNoteInput = document.querySelector("#note-content")
const notesContainer = document.querySelector("#notes-container")

const searchInput = document.querySelector("#search")

const exportButton = document.querySelector("#export-notes")

// FUNCTION

const createNewNote = (noteContent) => {

    const notes = getNotes()

    const newNote = {
        id: generateId(),
        content: noteContent,
        fixed: false
    }
    
    const noteElement = createNoteElement(newNote.content, newNote.id)

    notesContainer.appendChild(noteElement)

    notes.push(newNote)
    
    saveNoteLocalStorage(notes)

    addNoteInput.value = ""
}

const createNoteElement = (noteContent, noteId, noteFixed) => {
    const noteDiv = document.createElement("div")
    const noteTextarea = document.createElement("textarea")
    
    const notePinIcon = document.createElement("i")
    const noteRemoveIcon = document.createElement("i")
    const noteDuplicateIcon = document.createElement("i")
    
    noteDiv.classList.add("note")
    
    noteTextarea.placeholder = "Adicione algum texto"
    noteTextarea.value = noteContent
    
    noteDiv.appendChild(noteTextarea)

    notePinIcon.classList.add(...["bi", "bi-pin"])
    noteRemoveIcon.classList.add(...["bi", "bi-x-lg"])
    noteDuplicateIcon.classList.add(...["bi", "bi-file-earmark-plus"])

    noteDiv.appendChild(notePinIcon)
    noteDiv.appendChild(noteRemoveIcon)
    noteDiv.appendChild(noteDuplicateIcon)

    if(noteFixed) {
        noteDiv.classList.add("fixed")
    }

    noteDiv.querySelector("textarea").addEventListener("keyup", (e) => {
        const noteContent = e.target.value
        
        updateNote(noteId, noteContent)
    })

    noteDiv.querySelector(".bi-pin").addEventListener("click", () => {
        toggleFixedNotes(noteId)
    })

    noteDiv.querySelector(".bi-x-lg").addEventListener("click", () => {
        deleteNoteLocalStorage(noteId, noteDiv)
    })

    noteDiv.querySelector(".bi-file-earmark-plus").addEventListener("click", () => {
        duplicateNote(noteId)
    })


    return noteDiv
}

const generateId = () => {
    const randomId = Math.floor(Math.random() * 5000)

    return randomId
}

const showNotes = () => {
    cleanNotes()

    getNotes().forEach((note) => {
        const noteElement = createNoteElement(note.content, note.id, note.fixed)

        notesContainer.appendChild(noteElement)
    })
}

const cleanNotes = () => {
    notesContainer.replaceChildren([])
}

const toggleFixedNotes = (noteId) => {
    const notes = getNotes()

    const targetNote = notes.filter((note) => note.id === noteId)[0]

    targetNote.fixed = !targetNote.fixed

    saveNoteLocalStorage(notes)

    showNotes()
}

const duplicateNote = (noteId) => {
    const notes = getNotes()
    const targetNote = notes.filter((note) => note.id === noteId)[0]

    const newNote = {
        id: generateId(),
        content: targetNote.content,
        fixed: false
    }

    const noteDiv = createNoteElement(newNote.content, newNote.id, newNote.fixed)

    notesContainer.appendChild(noteDiv)

    notes.push(newNote)

    saveNoteLocalStorage(notes)
}

const searchNotes = (search) => {
    const searchResults = getNotes().filter((note) => note.content.includes(search))

    if(search !== ""){
        cleanNotes()
        
        searchResults.forEach((note) => {
            const noteElement = createNoteElement(note.content, note.id)
            notesContainer.appendChild(noteElement)
        })

        return
    }

    cleanNotes()
    showNotes()
}

const exportData = () => {
    const notes = getNotes()

    const csvString = [
        ["ID", "CONTEÚDO", "FIXADO?"],
        ...notes.map((note) => [note.id, note.content, note.fixed])
    ].map((e) => e.join(",")).join("\n")

    const element = document.createElement("a")

    element.href = "data:text/csv;charset=utf-8," + encodeURI(csvString)

    element.target = "_blank"

    element.download = "notes_csv"

    element.click()
}

// EVENTS

addNoteButton.addEventListener("click", (e) => {
    const newNoteContent = addNoteInput.value


    createNewNote(newNoteContent)
})

searchInput.addEventListener("keyup", (e) => {
    const search = e.target.value

    searchNotes(search)
})

addNoteInput.addEventListener("keydown", (e) => {
    if(e.key === "Enter"){
        createNewNote(addNoteInput.value)
    }
})

exportButton.addEventListener("click", (e) => {
    exportData()
})

// LOCAL STORAGE

const getNotes = () => {
    const notes = JSON.parse(localStorage.getItem("notes") || "[]")

    const orderedNotes = notes.sort((a, b) => (a.fixed > b.fixed ? -1 : 1))

    return orderedNotes
}

const saveNoteLocalStorage = (newNote) => {
    localStorage.setItem("notes", JSON.stringify(newNote))
}

const deleteNoteLocalStorage = (noteId, noteDiv) => {
    const notes = getNotes().filter((note) => note.id !== noteId)

    saveNoteLocalStorage(notes)

    notesContainer.removeChild(noteDiv)
}

const updateNote = (noteId, noteContent) => {
    const notes = getNotes()
    const targetNote = notes.filter((note) => note.id === noteId)[0]

    targetNote.content = noteContent

    saveNoteLocalStorage(notes)
}

// INITIALIZE

showNotes()
