import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import JobDetails from "@/pages/job-details";
import Companies from "@/pages/companies";
import Applications from "@/pages/applications";
import PostJob from "@/pages/post-job";
import UploadCV from "@/pages/upload-cv";
import Profile from "@/pages/profile";
import Navbar from "@/components/layout/navbar";

function Router() {
  return (
    <div className="min-h-screen netflix-bg">
      <Navbar />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/job/:id" component={JobDetails} />
        <Route path="/companies" component={Companies} />
        <Route path="/applications" component={Applications} />
        <Route path="/post-job" component={PostJob} />
        <Route path="/upload-cv" component={UploadCV} />
        <Route path="/profile" component={Profile} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
