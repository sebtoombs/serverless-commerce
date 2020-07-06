import React from "react";
import Dashboard from "../layouts/Dashboard";
import PageHeader from "../layouts/Dashboard/PageHeader";

export default function Home() {
  return (
    <Dashboard>
      <PageHeader breadcrumbs={true}></PageHeader>
    </Dashboard>
  );
}
