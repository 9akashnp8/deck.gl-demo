import flows from '../public/data/flows.json'

export function getLocationTrips(id: string): [incoming: number, outgoing: number, internal: number] {
    const internalTrips = flows
        .filter((flow) => {
            if (id == flow.dest || id == flow.origin) {
                if (flow.dest == flow.origin) {
                    return flow
                }
            }
        })
        .reduce((accumulator, currentValue) => (
            accumulator + currentValue.count
        ), 0)
    const incomingTrips = flows
        .filter((flow) => {
            if (id == flow.dest && id !== flow.origin) {
                return flow
            }
        })
        .reduce((accumulator, currentValue) => (
            accumulator + currentValue.count
        ), 0)
    const outgoingTrips = flows
        .filter((flow) => {
            if (id == flow.origin && id !== flow.dest) {
                return flow
            }
        })
        .reduce((accumulator, currentValue) => (
            accumulator + currentValue.count
        ), 0)

    return [incomingTrips, outgoingTrips, internalTrips]
}