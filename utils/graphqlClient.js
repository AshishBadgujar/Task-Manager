
export async function graphClient(query, variables = {}) {
    try {
        let res = await fetch('http://localhost:3000/api/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                query,
                variables,
            }),
            cache: 'no-store'
        })
        return await res.json()
    } catch (error) {
        console.log(error)
    }
}
