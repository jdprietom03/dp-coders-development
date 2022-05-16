import React, { useState, useEffect } from 'react';

import SyntaxHighlighter from 'react-syntax-highlighter';
import Select, { Option } from './../select/Select';

import classes from "./editor.module.css";
import languagesTemplate from './templates.json';
import axios from 'axios';
const style:{} = {
    'hljs': {
      display: 'block',
      overflowX: 'auto',
      padding: '0.5em',
      color: '#abb2bf',
      background: '#191942',
    },
    'hljs-keyword': {
      color: '#F92672',
    },
    'hljs-operator': {
      color: '#F92672',
    },
    'hljs-pattern-match': {
      color: '#F92672',
    },
    'hljs-pattern-match .hljs-constructor': {
      color: '#61aeee',
    },
    'hljs-function': {
      color: '#61aeee',
    },
    'hljs-function .hljs-params': {
      color: '#A6E22E',
    },
    'hljs-function .hljs-params .hljs-typing': {
      color: '#FD971F',
    },
    'hljs-module-access .hljs-module': {
      color: '#7e57c2',
    },
    'hljs-constructor': {
      color: '#e2b93d',
    },
    'hljs-constructor .hljs-string': {
      color: '#9CCC65',
    },
    'hljs-comment': {
      color: '#8983899c',
      fontStyle: 'italic',
    },
    'hljs-quote': {
      color: '#8983899c',
      fontStyle: 'italic',
    },
    'hljs-doctag': {
      color: '#c678dd',
    },
    'hljs-formula': {
      color: '#c678dd',
    },
    'hljs-section': {
      color: '#e06c75',
    },
    'hljs-name': {
      color: '#e06c75',
    },
    'hljs-selector-tag': {
      color: '#e06c75',
    },
    'hljs-deletion': {
      color: '#e06c75',
    },
    'hljs-subst': {
      color: '#e06c75',
    },
    'hljs-literal': {
      color: '#56b6c2',
    },
    'hljs-string': {
      color: '#26a2c1',
    },
    'hljs-regexp': {
      color: '#26a2c1',
    },
    'hljs-addition': {
      color: '#26a2c1',
    },
    'hljs-attribute': {
      color: '#26a2c1',
    },
    'hljs-meta-string': {
      color: '#26a2c1',
    },
    'hljs-built_in': {
      color: '#e6c07b',
    },
    'hljs-class .hljs-title': {
      color: '#e6c07b',
    },
    'hljs-attr': {
      color: '#d19a66',
    },
    'hljs-variable': {
      color: '#d19a66',
    },
    'hljs-template-variable': {
      color: '#d19a66',
    },
    'hljs-type': {
      color: '#d19a66',
    },
    'hljs-selector-class': {
      color: '#d19a66',
    },
    'hljs-selector-attr': {
      color: '#d19a66',
    },
    'hljs-selector-pseudo': {
      color: '#d19a66',
    },
    'hljs-number': {
      color: '#d19a66',
    },
    'hljs-symbol': {
      color: '#61aeee',
    },
    'hljs-bullet': {
      color: '#61aeee',
    },
    'hljs-link': {
      color: '#61aeee',
      textDecoration: 'underline',
    },
    'hljs-meta': {
      color: '#61aeee',
    },
    'hljs-selector-id': {
      color: '#61aeee',
    },
    'hljs-title': {
      color: '#61aeee',
    },
    'hljs-emphasis': {
      fontStyle: 'italic',
    },
    'hljs-strong': {
      fontWeight: 'bold',
    },
  };
  
const languages = languagesTemplate as any;

const Code: React.FC = () => {
  const [code, setCode] = useState<string>(languages['54'].template);
  const [output, setOutput] = useState<any>();
  const [error, setError] = useState<any>();
  const [input, setInput] = useState('');
  const [languageId, setLanguage] = useState('54');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document
      .getElementsByClassName(classes.editor)[0]
      .setAttribute(
        'style',
        `height: calc(${
          document.getElementById('code')?.clientHeight || 40
        }px - .5rem)`
      );
  });

  const evaluate = (data: any) => {
    return parseInt(input) % 2 == 0 ? 'YES' : 'NO';
  };

  const indenting = (event: any) => {
    if (event.keyCode === 9) {
      event.preventDefault();

      let val = event.target.value,
        start = event.target.selectionStart,
        end = event.target.selectionEnd;

      event.target.value =
        val.substring(0, start) + ' '.repeat(4) + val.substring(end);
      event.target.selectionStart = event.target.selectionEnd = start + 4;
      setCode(event.target.value);
    }
  };

  const saveInput = (event: any) => {
    event.preventDefault();
    setOutput(null);
    setInput(event.target.value);
  };

  const changeLanguage = (data: any) => {
    const value = data.value as string;
    
    setLanguage(value);
    const template: string = languages[value].template;
    setCode(template);
  };
  const submit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    axios.post('/api/judge/compile', {
    code: code,
    language_id: languageId,
    input: input
    })
    .then((res) => {
        console.log(res)
        const { stdout, stderr } = res.data;
        setLoading(false);
        //console.log(response);
        setOutput(stdout);
        setError(stderr);
    });
  };

  return (
    <div className={classes.work_place}>
      <div className={classes.code_area}>
        <div className={classes.lines}>
          {code.split('\n').map((item, index) => (
            <span key={index}>{index + 1}</span>
          ))}
        </div>
        <textarea
          className={classes.editor}
          value={code}
          onChange={(event: any) => setCode(event.target.value)}
          onKeyDown={indenting}
          spellCheck={false}
          name="editor"
          title="editor"
        ></textarea>
        <SyntaxHighlighter
          language={languages[languageId].tag}
          className={classes.code}
          style={style}
          id="code"
        >
          {code}
        </SyntaxHighlighter>
      </div>
      <div className={classes.output_container}>
        <div className={classes.output_area}>
          <div className={`${classes.output_result} ${classes.input}`}>
            <span>Input</span>
            <div className={`${classes.output} ${(loading ? classes.loading_code : '')}`}>
              <textarea onChange={saveInput} name="output" title="output"></textarea>
            </div>
          </div>
          <div className={classes.output_result}>
            <span>Output</span>
            <div className={`${classes.output} ${(loading ? classes.loading_code : '')}`}>
              {output}
            </div>
          </div>
          <div className={classes.output_expected}>
            <div className={classes.output_status}>
              <span>Expected</span>
              {output && (
                <span
                  className={`
                    ${classes.status} ${(evaluate(input) === output ? classes.accepted : classes.wa)}`
                  }
                >
                  {evaluate(input) === output ? 'Accepted' : 'Wrong Answer'}
                </span>
              )}
            </div>
            <div className={'output ' + (loading ? 'loading-code' : '')}>
              {output ? evaluate(input) : ''}
            </div>
          </div>
        </div>
        <div className={classes.buttons_container}>
          {/* <Select onSelect={changeLanguage}>
            {Object.keys(languages).map((id) => (
              <Option value={id} key={id}>
                {languages[id].name}
              </Option>
            ))}
          </Select> */}
          <button type="button" onClick={submit}>
            Run
          </button>
          <button type="button" onClick={submit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Code;

/*


<Option className="option" value="54">
              C++
            </Option>
            <Option className="option" value="57">
              Elixir
            </Option>
            <Option className="option" value="60">
              Go
            </Option>
            <Option className="option" value="61">
              Haskell
            </Option>
            <Option className="option" value="62">
              Java
            </Option>
            <Option className="option" value="63">
              JavaScript
            </Option>
            <Option className="option" value="78">
              Kotlin
            </Option>
            <Option className="option" value="71">
              Python
            </Option>
            <Option className="option" value="72">
              Ruby
            </Option>
            <Option className="option" value="74">
              TypeScript
            </Option>
*/
