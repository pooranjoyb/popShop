import React from "react";
import Head from "../../components/Head";
import { useEffect, useState } from "react";
import emailjs from "@emailjs/browser";
import FQA from "./FQA";

function Contact() {
  const [formDetails, setFormDetails] = useState({ name: '', email: '', message: '', 'g-recaptcha-response': '' })
  const [sendStatus, setSendStatus] = useState(false)

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormDetails({ ...formDetails, [(e.target as HTMLInputElement).name]: (e.target as HTMLInputElement).value })
  }

  const onChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormDetails({ ...formDetails, [(e.target as HTMLTextAreaElement).name]: (e.target as HTMLTextAreaElement).value })
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setSendStatus(true)
    e.preventDefault()
    await emailjs.send(import.meta.env.VITE_EMAILJS_SERVICE_ID!, import.meta.env.VITE_EMAILJS_TEMPLATE_ID!, formDetails, import.meta.env.VITE_EMAILJS_PUBLIC_KEY)
      .then(function (response) {
      .catch(err => console.error(err))