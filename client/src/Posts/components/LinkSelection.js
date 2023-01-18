import React, { useState } from 'react'; 
import { Container, 
         Grid,
         Form, 
         Icon,
         Popup, 
         Header,
         List} from 'semantic-ui-react';
import Embed from 'react-embed';

function LinkSelection({ link, embeddable, setLink, handleEmbedChange }) {
  

  const [previewLink, setPreviewLink] = useState(link);
  function handlePreviewClick(e) {
    setLoading(false);
  }

  const [loading, setLoading] = useState(false);
  const [previewEmbed, setEmbed] = useState(embeddable);
  const preview = (e, data) => {
      setLoading(true);
      setPreviewLink(data.val);
      setEmbed(embeddable);
      setTimeout(()=>{
      handlePreviewClick();
    }, 1000)
  }
  

  // TODO - make the save button the only way to update the main
  // component's link state 

  return(
    <Container style={{ padding: 50 }}>
      <Grid columns={2}>
        <Grid.Column verticalAlign='middle' width={5}>
          <Container>
          <Form loading={loading}>
            <Form.Group>
              <Form.Input
                icon={{ name:'eye', circular: true, 
                        link: true, onClick: preview, val: link}}
                value={link} name={'link'} onChange={setLink}
              />
            </Form.Group>
            <Form.Group>
              <Popup
              position='bottom left'
              content='Choose if you want to embed this content on your post. 
                      Test if the embed displays by clicking icon next to the 
                      search bar above'
              trigger={
                <Form.Radio
                  checked={embeddable}
                  onChange={handleEmbedChange}
                  label='Embed this content?'
                  toggle/>
                }
            />
            </Form.Group>
          </Form>
        </Container>
        </Grid.Column>
        <Grid.Column verticalAlign='middle' width={10}>
          {(() => {
            if (loading) {
              return <Icon loading name='spinner'/>
            } else {
              if (previewLink) {
                return (previewEmbed ? <EmbedPreview link={previewLink}/> : <LinkPreview link={previewLink}/>)
              } else {
                return <div>Enter a link and hit the preview icon to load</div>
              }
            }
          })()}
        </Grid.Column>
      </Grid>
    </Container>
  )

}

const EmbedPreview = ({link}) => {
  function voidReponse() {
    return <Header icon>
              <Icon name='warning'/>
              <Header.Content>
                Can't embed this URL. Try displaying as a hyperlink instead.
              </Header.Content>
            </Header>
  }
  return <Embed width={400} renderVoid={voidReponse} url={link}/>
}

const LinkPreview = ({ link }) => {
  return (
    <div>
    <List>
      <List.Item icon={{name: 'linkify'}} as='a' href={link} content={link}>
      </List.Item>
    </List>
    </div>
  )
}
export default LinkSelection;