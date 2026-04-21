import { useState } from 'react'

const App = () => {
    const anecdotes = [
	'Se fizer algo dói, faça isso com mais frequência.',
	'Contratar mão de obra para um projeto de software que já está atrasado, faz com que se atrase mais ainda!',
	'Os primeiros 90% do código correspondem aos primeiros 10% do tempo de desenvolvimento... Os outros 10% do código correspondem aos outros 90% do tempo de desenvolvimento.',
	'Qualquer tolo escreve código que um computador consegue entender. Bons programadores escrevem código que humanos conseguem entender.',
	'Otimização prematura é a raiz de todo o mal.',
	'Antes de mais nada, depurar é duas vezes mais difícil do que escrever o código. Portanto, se você escrever o código da forma mais inteligente possível, você, por definição, não é inteligente o suficiente para depurá-lo.',
	'Programar sem o uso extremamente intenso do console.log é o mesmo que um médico se recusar a usar raio-x ou testes sanguíneos ao diagnosticar pacientes.',
	'A única maneira de ir rápido é ir bem.'
    ]

    const [selected, setSelected] = useState(0)
    const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))
    const [mostVoted, setMostVoted] = useState(-1)

    const handleNextAnecdoteClick = () => setSelected(Math.floor(Math.random() * anecdotes.length)

    const handleVoteClick = () => {
	const updatedVotes = [...votes]
	updatedVotes[selected] += 1
	setVotes(updatedVotes)
	
	const selectedVotes = updatedVotes[selected]
	
	if (mostVoted === -1 || selectedVotes > updatedVotes[mostVoted]) {
	    setMostVoted(selected)
    }

  return (
    <div>
	<Header text='Anecdote of the day' />
        <Anecdote anecdote={anecdotes[selected]} />
	<Votes votes={votes[selected]} />
	<Button label='vote' handleClick={handleVoteClick} />
	<Button label='next anecdote' handleClick={handleNextAnecdoteClick} />
	<Header text='Anecdote with most votes' />
	<Anecdote anecdote={anecdotes[mostVoted]} />
    </div>
  )
}

const Anecdote = ({anecdote}) => <p>{anecdote}</p>

const Button = ({label, handleNextAnecdoteClick}) => <button onClick={handleNextAnecdoteClick}>{label}</button>

const Votes = ({votes}) => {
    let votesMessage = 0
    if (votes === undefined) {
	votesMessage = "has 0 votes"
    } else if (votesMessage === 1) {
	votesMessage = `has ${votes} vote`
    } else {
	votesMessage = `has ${votes} votes`
    }

    return(
	<p>{votesMessage}</p>
    )
}

const Header = ({text}) => <h2>{text}</h2>

export default App

