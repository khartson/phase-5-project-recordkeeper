import React from 'react';
import { Segment,
         Container,
         Button,
         Form } from 'semantic-ui-react';

function ContentAndDescription({ nextPage, prevPage}) {

  return(
    <Segment>
      <Container style={{ display: 'flex'}}>
        <Container>
          <Button floated='left' compact
                  onClick={prevPage}>
                  Previous
          </Button>
        </Container>
        <Container>
          <Button floated='right'
                  compact disabled
                  onClick={nextPage}>
                  Next
          </Button>
        </Container>
      </Container>



    </Segment>
  )
}

export default ContentAndDescription;