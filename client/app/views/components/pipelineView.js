'use strict';

var _ = require('lodash');
var $ = require('jquery');

// $divider :: undefined -> DOM
var $divider = function() {
  return $('<div>', { 'class': 'divider' });
};

// $basePipelineMarkup :: undefined -> DOM
var $basePipelineMarkup = function() {
  return $('<section>', { 'class': 'pipeline-container row' });
};

// $renderTitle :: String -> DOM
var $renderTitle = function(name) {
  return $('<header>', { 'class': 'row' }).
    append($('<h4>', { text: name, 'class': 'title col s12' }));
};

// $renderJob :: Job -> DOM
var $renderJob = function(pipelineJob) {
  return $('<article>', { 'class': 'job-card col card' }).
    append($('<div>', { 'class': 'title card-content', text: pipelineJob.name }));
};

// $renderJobs :: [Job] -> DOM
var $renderJobs = function(jobs) {
  return $('<section>', { 'class': 'row' }).append(jobs.map($renderJob));
};

// $toPipelineDOM :: Pipeline -> PipelineDOM
var $toPipelineDOM = function(pipeline) {
  return {
    title: $renderTitle(pipeline.name),
    jobs: $renderJobs(pipeline.jobs)
  };
};

// $wrapMarkup :: (undefined -> DOM) -> (undefined -> DOM) -> PipelineDOM -> DOM
var $wrapMarkup = _.curry(function($header, $footer, pipelineDOM) {
  return $header().
    append(pipelineDOM.title).
    append(pipelineDOM.jobs).
    append($footer());
});

var pipelineView = {
  // $render :: Pipeline -> DOM
  $render: _.flow($toPipelineDOM, $wrapMarkup($basePipelineMarkup, $divider))
};

module.exports = pipelineView;