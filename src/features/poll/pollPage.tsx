import React from 'react'
import { Header, Table, Container, Button, Checkbox } from 'semantic-ui-react'
import { PollHttpService } from '../../services/http/pollHttpService';
import { Poll } from '../../models/Poll';

type statePoll = {
    polls: Poll[]
}

export class PollPage extends React.Component<{}, statePoll> {
    private pollHttpService = new PollHttpService();
    constructor(props: any) {
        super(props);
        this.state = {
            polls: []
        }
    }

    /**
     * Initiate the state user with his data.
     */
    async componentDidMount() {
        try {
            const polls = await this.pollHttpService.getAllPolls();
            if (polls) {
                this.setState({
                    polls: polls
                });
            }
        } catch (err) {
            console.log(err);
        }
    }

    /**
     * Redraw after state is update.
     */
    async componentDidUpdate() {
        try {
            const polls = await this.pollHttpService.getAllPolls();
            if (polls) {
                this.setState({
                    polls: polls
                });
            }
        } catch (err) {
            console.log(err);
        }
    }

    /**
     * Delete a user méthod.
     */
    handlerDeletePoll = (event: any) => {
        try {
            this.pollHttpService.deletePoll(event.target.value);
        } catch (err) {
            console.log(err);
        }
    }

    /**
     * Update a user (méthod used when we vote for a choice).
     */
    handlerUpdatePoll = (event: any) => {
        try {
            this.pollHttpService.updatePoll(event.target.value);
        } catch (err) {
            console.log(err);
        }
    }

    /**
     * Get's all polls.
     */
    renderListPolls() {
        return this.state.polls.map(value =>
            <>
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell textAlign="center" width={13}>{value.title}</Table.HeaderCell>
                            <Table.HeaderCell textAlign="center">
                                <Button value={value._id} onClick={this.handlerDeletePoll}>Supprimer le sondage</Button>
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {value.choices.map(valueChoice =>
                            <Table.Row>
                                <Table.Cell>{valueChoice.label}</Table.Cell>
                                <Table.Cell textAlign="center"> <Checkbox name="choix" /></Table.Cell>
                            </Table.Row>
                        )}
                        <Table.Row>
                            <Table.Cell />
                            <Table.Cell textAlign="center">
                                <Button value={value} onClick={this.handlerUpdatePoll}>Voter</Button>
                            </Table.Cell>
                        </Table.Row>
                    </Table.Body>
                    <Table.Footer></Table.Footer>
                </Table>
            </>
        );
    }

    render() {
        if (this.state.polls) {
            return (
                <>
                    <Container>
                        <Header as='h1'>Liste des sondages</Header>
                        {this.renderListPolls()}
                    </Container>
                    <br />
                </>
            )
        }
        return (
            <></>
        )
    }
}
