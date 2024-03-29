import React, { useEffect, useState } from 'react';
import qs from 'qs';

import { Wrapper, Card, Templates, Form, Button } from './style';
import logo from '../../images/logo.svg';
import Swal from 'sweetalert2';

export default function Home() {
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [boxes, setBoxes] = useState([]);
  const [generatedMeme, setGeneratedMeme] = useState(null);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const resp = await fetch('https://api.imgflip.com/get_memes');
    const { data: { memes } } = await resp.json();
    setTemplates(memes);
  }

  //curryng -> função que retorna uma outra função
  const handleInputChange = (index) => (event) => {
    const newValues = boxes;
    newValues[index] = event.target.value;
    setBoxes(newValues);
  }

  function handleSelectTemplate(template) {
    setSelectedTemplate(template);
    setBoxes([]);
  }

  async function onSubmit(e) {
    e.preventDefault();
    if (boxes.length === 0) {
      return Swal.fire({
        icon: 'error',
        text: 'Por favor digite os campos abaixo!',
      });
    }
    const params = qs.stringify({
      template_id: selectedTemplate.id,
      username: 'brunopapait123',
      password: '123mudar',
      boxes: boxes.map(text => ({ text }))
    });

    const resp = await fetch(`https://api.imgflip.com/caption_image?${params}`);
    const { data: { url } } = await resp.json();

    setGeneratedMeme(url);
  }

  function handleReset() {
    setSelectedTemplate(null);
    setBoxes([]);
    setGeneratedMeme(null);
  }

  return (
    <Wrapper>
      <img src={logo} alt="MemeMaker" />
      <Card>
        {generatedMeme ? <>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <a target='_blank' href={generatedMeme} >
              <img style={{ paddingBottom: '5px' }} src={generatedMeme} alt="Generated Meme" />
            </a>
          </div>
          <Button onClick={handleReset}> Criar um novo meme </Button>
        </> : <>
          <h2>Selecione um template</h2>
          <Templates>
            {templates.map(template => (
              <button key={template.id}
                type="button"
                onClick={() => handleSelectTemplate(template)}
                className={template.id === selectedTemplate?.id ? 'selected' : ''} >
                <img src={template.url} alt={template.name} />
              </button>
            ))}
          </Templates>
          {
            selectedTemplate && (
              <>
                <h2>Textos</h2>
                <Form onSubmit={onSubmit} >
                  {(new Array(selectedTemplate.box_count)).fill('').map((_, index) => (
                    <input
                      key={String(Math.random())}
                      placeholder={`Texto #${index + 1}`}
                      onChange={handleInputChange(index)} />
                  ))}
                  <Button> MakeMyMeme ! </Button>
                </Form>
              </>
            )
          }
        </>}
      </Card>
    </Wrapper >
  )
}